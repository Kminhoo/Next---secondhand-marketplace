import Image from "next/image";
import Container from "@/components/Container";
import EmptyState from "@/components/EmptyState"
import gerProduct, { ProductParams } from "../actions/getProducts";
import ProductCard from "@/components/products/ProductCard";
import getCurrentUser from '../actions/getCurrentUser'
import FloatingButton from "@/components/categories/FloatingButton";
import Categories from "@/components/categories/Categories";
import Pagination from "@/components/Pagination";
import { PRODUCT_PER_PAGE } from "@/constant";

interface HomeProps {
  searchParams: ProductParams
}

export default async function Home({ searchParams }: HomeProps) {
  const products = await gerProduct(searchParams);

  const currentUser = await getCurrentUser()

  const page = searchParams?.page
  const pageNum = typeof page === 'string' ? Number(page) : 1
  // console.log(pageNum)

  // console.log('product: ', products)
  // console.log('searchParams : ', searchParams)
  return (
    <Container>

      <Categories />

      {
        products?.data.length === 0 
        ? <EmptyState showReset/> 
        : 
        <>
          <div 
            className="grid grid-cols-1 gap-8 pt-12 sm:grid-cols-2 md:grid-cols-3 
            lg:grid-cols-4 2xl:grid-cols-6"
          >
            {products.data.map((product) => (
              <ProductCard 
                currentUser={currentUser}
                key={product.id}
                data={product}
              />
            ))}
          </div>
        </>
      }

      <Pagination page={pageNum} totalItems={products.totalItems} perPage={PRODUCT_PER_PAGE}/>

      <FloatingButton href="/product/upload">
        +
      </FloatingButton>

    </Container>
  );
}
