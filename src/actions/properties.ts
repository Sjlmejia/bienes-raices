'use server'

import { GetCurrentUserFromMongoDb } from "./users";
import prisma from "@/config/db";
import { revalidatePath } from "next/cache";
export const AddProperty = async(property: any) => {
  try {
    const user:any = await GetCurrentUserFromMongoDb();
    property.userId = user.data.id;
    await prisma.property.create({ 
      data: property 
    });
    revalidatePath('/user/properties');
    return {
      data: property,
      message: 'Property added successfully'
    }
  } catch (error: any) { 
    return {
      error: error.message
    }
  }
}

export const EditProperty = async (property: any, id : string) => {
  try {
    await prisma.property.update({
      where: { 
        id
       },
      data: property
    });
    revalidatePath('/user/properties');
    return {
      data: property,
      message: 'Property updated successfully'
    }
  } catch (error: any) {
    return {
      error: error.message
    }
  }
}