import { BreadCrumbs, SectionContainer } from "tp-kit/components";
import { PRODUCTS_CATEGORY_DATA } from "tp-kit/data";
import { ProductList } from "../../components/product-list";
import { NextPageProps } from "../../types";
import { Metadata } from "next";
import { cache } from 'react'
import prisma from "../../utils/prisma";
import { notFound } from "next/navigation";

type Props = {
  categorySlug: string;
};

export const getCategory = cache((categorySlug: string) => prisma.productCategory.findUnique({
  include: {
    products: true,
  },
  where : {
    slug: categorySlug,
  }
}));

export async function generateMetadata({ params, searchParams} : NextPageProps<Props>) : Promise<Metadata> {
  const category = await getCategory(params.categorySlug);
  if (!category){
    return {}
  }
  return {
    title: category.name,
    description: `Trouvez votre inspiration avec un vaste choix de boissons Starbucks parmi nos produits ${category.name}`
  }
}

export default async function CategoryPage({params}: NextPageProps<Props>) {
  const category = await getCategory(params.categorySlug);
  if (!category){
    return notFound(); 
  }
  return <SectionContainer>
    <BreadCrumbs 
      items={[
        {
          label: "Accueil",
          url: "/"
        },
        {
          label: category.name,
          url: `/${category.slug}`
        }
      ]}
    />

    <ProductList categories={[category]} />
  </SectionContainer>
}