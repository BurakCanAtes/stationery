import UpdateProfileForm from "@/components/forms/UpdateProfileForm";

export default function Profile() {
  return (
    <div className="mx-auto max-w-7xl p-4 sm:p-6 md:py-8">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">Profile</h1>
      <main className="my-6 max-w-96 w-full">
        <UpdateProfileForm />
      </main>
    </div>
  );
}
