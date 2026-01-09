import { use } from "react";

const Page = ({ params }: { params: Promise<{ id: number }> }) => {
  const { id } = use(params);
};

export default Page;
