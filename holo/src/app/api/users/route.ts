import { NextResponse } from "next/server";
import User from "@/models/user"; // Импорт модели
//import { connectToDB } from "./lib/db"; // Функция подключения к базе данных

// Подключение к базе данных перед выполнением запроса
//await connectToDB();

/**
 * Получить всех пользователей (GET /api/user)
 */
export async function GET() {
  try {
    const users = await User.find();
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Ошибка при получении пользователей" }, { status: 500 });
  }
}

/**
 * Создать пользователя (POST /api/user)
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newUser = new User(body);
    await newUser.save();
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Ошибка при создании пользователя" }, { status: 500 });
  }
}

/**
 * Удалить пользователя (DELETE /api/user?id=...)
 */
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ message: "Не указан ID" }, { status: 400 });
    }

    await User.findByIdAndDelete(id);
    return NextResponse.json({ message: "Пользователь удалён" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Ошибка при удалении пользователя" }, { status: 500 });
  }
}
