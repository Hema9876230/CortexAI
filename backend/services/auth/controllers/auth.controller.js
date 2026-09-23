import crypto from "crypto";
import { getAuth } from "firebase-admin/auth";

import { app } from "../config/firebase.js";
import User from "../models/user.model.js";
import redis from "../../../shared/redis/redis.js";


/* =====================================================
   LOGIN
===================================================== */

export const login = async (req, res) => {
    try {
        const { token } = req.body;

        console.log("========== LOGIN START ==========");

        // Check token
        if (!token) {
            console.log("Firebase token is missing");

            return res.status(400).json({
                success: false,
                message: "Firebase token is missing"
            });
        }

        console.log("Firebase token received");

        // Verify Firebase token
        const decoded = await getAuth(app).verifyIdToken(token);

        console.log("Firebase token verified");
        console.log("Firebase UID:", decoded.uid);
        console.log("Firebase Email:", decoded.email);

        // Find existing user
        let user = await User.findOne({
            firebaseUid: decoded.uid
        });

        // Create new user
        if (!user) {
            console.log("User not found. Creating new user...");

            user = await User.create({
                firebaseUid: decoded.uid,
                name: decoded.name || "User",
                email: decoded.email,
                avatar: decoded.picture || ""
            });

            console.log("New user created:", user._id);
        } else {
            console.log("Existing user found:", user._id);
        }

        // Create session ID
        const sessionId = crypto.randomUUID();

        console.log("Session ID created");

        // Save user -> session mapping in Redis
        await redis.set(
            `user-session-${user._id}`,
            sessionId,
            "EX",
            7 * 24 * 60 * 60
        );

        console.log("User session saved in Redis");

        // Save session data
        await redis.set(
            `session-${sessionId}`,
            JSON.stringify({
                userId: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                plan: user.plan,
                credits: user.credits,
                totalCredits: user.totalCredits,
                planExpiresAt: user.planExpiresAt
            }),
            "EX",
            7 * 24 * 60 * 60
        );

        console.log("Session data saved in Redis");

        // Set cookie
        res.cookie("session", sessionId, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        console.log("Session cookie created");
        console.log("========== LOGIN SUCCESS ==========");

        return res.status(200).json({
            success: true,
            user
        });

    } catch (error) {

        console.error("========== LOGIN ERROR ==========");
        console.error("Error name:", error.name);
        console.error("Error message:", error.message);
        console.error(error);
        console.error("=================================");

        return res.status(500).json({
            success: false,
            message: error.message || "Login failed"
        });
    }
};


/* =====================================================
   LOGOUT
===================================================== */

export const logOut = async (req, res) => {
    try {

        const sessionId = req.cookies?.session;

        if (sessionId) {
            await redis.del(`session-${sessionId}`);
        }

        res.clearCookie("session", {
            httpOnly: true,
            secure: false,
            sameSite: "strict"
        });

        return res.status(200).json({
            success: true,
            message: "Logout successfully"
        });

    } catch (error) {

        console.error("LOGOUT ERROR:", error);

        return res.status(500).json({
            success: false,
            message: error.message || "Logout failed"
        });
    }
};


/* =====================================================
   UPDATE USER PAYMENT
===================================================== */

export const updateUserPayment = async (req, res) => {
    try {

        const {
            plan,
            credits,
            userId
        } = req.body;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User ID is required"
            });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        user.plan = plan;

        user.credits =
            Number(user.credits || 0) +
            Number(credits || 0);

        user.totalCredits =
            Number(user.totalCredits || 0) +
            Number(credits || 0);

        user.planExpiresAt = new Date(
            Date.now() +
            30 * 24 * 60 * 60 * 1000
        );

        await user.save();

        // Get current session
        const sessionId = await redis.get(
            `user-session-${user._id}`
        );

        console.log("Session ID:", sessionId);

        if (sessionId) {

            await redis.set(
                `session-${sessionId}`,
                JSON.stringify({
                    userId: user._id,
                    name: user.name,
                    email: user.email,
                    avatar: user.avatar,
                    plan: user.plan,
                    credits: user.credits,
                    totalCredits: user.totalCredits,
                    planExpiresAt: user.planExpiresAt
                }),
                "EX",
                7 * 24 * 60 * 60
            );
        }

        return res.status(200).json({
            success: true,
            message: "Payment plan updated successfully"
        });

    } catch (error) {

        console.error(
            "UPDATE PAYMENT ERROR:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                error.message ||
                "Update payment failed"
        });
    }
};


/* =====================================================
   DEDUCT CREDITS
===================================================== */

export const deductCredits = async (req, res) => {
    try {

        const {
            userId,
            agent
        } = req.body;

        const COST = {
            chat: 1,
            search: 5,
            coding: 10,
            pdf: 10,
            ppt: 10,
            vision: 10
        };

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User ID is required"
            });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const requiredCredits =
            COST[agent] || 1;

        if (user.credits < requiredCredits) {
            return res.status(400).json({
                success: false,
                message: "Not enough credits"
            });
        }

        user.credits -= requiredCredits;

        await user.save();

        // Get session
        const sessionId = await redis.get(
            `user-session-${user._id}`
        );

        console.log("Session ID:", sessionId);

        if (sessionId) {

            await redis.set(
                `session-${sessionId}`,
                JSON.stringify({
                    userId: user._id,
                    name: user.name,
                    email: user.email,
                    avatar: user.avatar,
                    plan: user.plan,
                    credits: user.credits,
                    totalCredits: user.totalCredits,
                    planExpiresAt: user.planExpiresAt
                }),
                "EX",
                7 * 24 * 60 * 60
            );
        }

        return res.status(200).json({
            success: true,
            credits: user.credits
        });

    } catch (error) {

        console.error(
            "DEDUCT CREDITS ERROR:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                error.message ||
                "Deduct credits failed"
        });
    }
};