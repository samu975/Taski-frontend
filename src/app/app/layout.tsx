import CategoryMenu from "@/components/app/category-menu";
import TaskMenu from "@/components/app/task-menu";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TaskMenu />
      <CategoryMenu />
      {children}
    </>
  );
}
