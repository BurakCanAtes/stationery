import { SignupForm } from "@/components/forms/SignupForm";

export default function Signup() {
  return (
    <div className="md:mt-4">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
        Create an account
      </h1>
      <p className="mt-4 text-base text-gray-700">
        Create an account to easily access your education, culture and
        entertainment shopping.
      </p>
      <main className="my-5">
        <SignupForm />
      </main>
    </div>
  );
}