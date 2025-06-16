import ProductFilterForm from "@/components/forms/ProductFilterForm";
import ProductCard from "@/components/products/ProductCard";
import { getCategoryById, getProducts } from "@/lib/tools/api";
import { capitalizeFirstLetter } from "@/lib/utils/helperFunctions";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function Products(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;
  const category = await getCategoryById(
    (searchParams.category as string) || ""
  );
  const products = await getProducts(searchParams);

  return (
    <div className="mx-auto max-w-7xl p-4 sm:p-6 md:py-8">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
        {category.name ? capitalizeFirstLetter(category.name) : "Products"}
      </h1>
      <ProductFilterForm categories={[category]} />
      <main className="mt-4 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-4">
        {products.data.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </main>
    </div>
  );
}
