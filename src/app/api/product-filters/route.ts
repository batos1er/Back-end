import { NextResponse } from "next/server";
import prisma from "../../../utils/prisma";

export async function GET(request: Request) {
    const categories = await prisma.productCategory.findMany(
        {include: {
          products: true,
        },});
        return NextResponse.json({})
}