import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { hash } from "bcrypt";
import { z } from 'zod';

interface UserData {
    username: string,
    email: string,
    password: string,
}

const userSchema = z.object({
    username: z.string().min(1, 'Username is required.').max(100),
    email: z.string().min(1, 'Email is required.').email('Invalid email.'),
    password: z.string().min(1, 'Password is required.').min(8, 'Password must have at least 8 characters.'),
});

export async function POST(req: Request) {
    try {
        const body: UserData = await req.json();
        const { email, username, password } = userSchema.parse(body);

        //check is email is already exists
        const existingUserByEmail = await db.user.findUnique({
            where: {
                email: email
            }
        });

        if (existingUserByEmail) {
            return NextResponse.json({
                user: null, message: "User with this email is already exists"
            },
                { status: 409 })
        }

        const existingUserByUsername = await db.user.findUnique({
            where: {
                username: username
            }
        });

        if (existingUserByUsername) {
            return NextResponse.json({
                user: null, message: "User with this username is already exists"
            },
                { status: 409 })
        }

        const hashPassword = await hash(password, 10);
        const newUser = await db.user.create({
            data: {
                username,
                email,
                password: hashPassword
            }
        });

        const { password: newUserPassword, ...rest } = newUser;

        return NextResponse.json({
            user: rest
        }, { status: 201 });

    } catch (error) {
        return NextResponse.json({
            message: 'Something went wrong.'
        })
    }
}