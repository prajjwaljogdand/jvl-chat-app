import db from "@/connections/db";
import { NextRequest, NextResponse } from "next/server";
import { URLSearchParams } from 'url';

export async function GET(req: NextRequest, res: any) {
  console.log(req);

  const yourParamName = req.nextUrl.searchParams.get('name');
  console.log(yourParamName)
  try {
    const  name  = req.nextUrl.searchParams.get('name');
    console.log(name);

    if (!name) {
      return new NextResponse("Internal Error", { status: 500 });
    }

    const users = await db.user.findMany({
      where: {
        name: {
          contains: name, // You can use other search options like `startsWith` or `endsWith` as well
        },
        
      },
    });

    return NextResponse.json(users);
  } catch (error) {
    new NextResponse("Internal Error", { status: 500 });
  }

  return new NextResponse("Internal Error", { status: 500 }); // Method not allowed
}
