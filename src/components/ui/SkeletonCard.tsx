import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-6 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[150px]" />
        <Skeleton className="h-4 w-[150px]" />
      </div>
    </div>
  )
}

export function RecipeDetailSkeleton() {
  return (

      <div className="flex flex-col space-y-3 p-4">
        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
        <div className="space-y-2">
        <Skeleton className="h-6 w-3/4" />  {/* Title */}
        <Skeleton className="h-4 w-1/2" />  {/* Category */}
        <Skeleton className="h-4 w-1/3" />  {/* Cooking Time */}
        <Skeleton className="h-4 w-1/4" />  {/* Difficulty */}
        <Skeleton className="h-4 w-full" />  {/* Ingredients */}
        <Skeleton className="h-4 w-5/6" />  {/* Instructions */}
        </div>
      </div>
  );
}