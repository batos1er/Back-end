import { PrismaClient } from '@prisma/client'
import {PRODUCTS_CATEGORY_DATA} from '../tp-kit/data/products-category.data'

const prisma = new PrismaClient()
async function main() {
    await prisma.productCategory.deleteMany({});

    for(const categoryRecord of PRODUCTS_CATEGORY_DATA) {
        // "retire" la prop "products" du category record
        const { products, ...category } = categoryRecord;

        // créer la catégorie en bdd
        await prisma.productCategory.create({data: category});

        // créer les produits de la cat en bdd
        await prisma.product.createMany({data: categoryRecord.products.map(produit =>({...produit, categoryId: category.id}))})
        
    }      
}
main()