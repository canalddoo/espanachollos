import { NextResponse } from "next/server";
import { db } from "@/db";
import { bankDetails } from "@/db/schema";
import { eq } from "drizzle-orm";

// Récupérer les coordonnées bancaires
export async function GET() {
  try {
    const details = await db.select().from(bankDetails).where(eq(bankDetails.id, 1)).get();
    // On s'assure de retourner au moins les valeurs par défaut si vide
    return NextResponse.json(details || { beneficiary: "", iban: "", bic: "" });
  } catch (error) {
    return NextResponse.json({ error: "Error al cargar datos" }, { status: 500 });
  }
}

// Mettre à jour les coordonnées bancaires (Upsert pour créer si l'id=1 n'existe pas)
export async function PUT(req: Request) {
  try {
    const { beneficiary, iban, bic } = await req.json();

    // insert().values().onConflictDoUpdate() gère à la fois l'enregistrement initial et la mise à jour
    await db
      .insert(bankDetails)
      .values({ id: 1, beneficiary, iban, bic })
      .onConflictDoUpdate({
        target: bankDetails.id,
        set: { beneficiary, iban, bic },
      });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("PUT bank-details error:", error);
    return NextResponse.json({ error: "Error al actualizar" }, { status: 500 });
  }
}