import { getCategoryById, getProducts } from "@/lib/tools/api";
import { capitalizeFirstLetter } from "@/lib/utils/helperFunctions";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function Products(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;
  const category = await getCategoryById(
    (searchParams.category as string) || ""
  );
  const products = await getProducts(1);

  console.log(category);
  console.log(products);
  return (
    <div className="mx-auto max-w-7xl p-4 sm:p-6 md:py-8">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
        {category.name ? capitalizeFirstLetter(category.name) : "Products"}
      </h1>
      <main className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div className="w-full h-52 bg-red-500"></div>
        <div className="w-full h-52 bg-red-500"></div>
        <div className="w-full h-52 bg-red-500"></div>
        <div className="w-full h-52 bg-red-500"></div>
        <div className="w-full h-52 bg-red-500"></div>
      </main>
    </div>
  );
}