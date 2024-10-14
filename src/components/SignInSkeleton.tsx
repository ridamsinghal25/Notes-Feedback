import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function SignInSkeleton() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <Card className="w-full max-w-md bg-gray-800 text-gray-100">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold text-center mb-10">
            <Skeleton className="h-12 w-72 bg-gray-700 mx-auto" />
          </CardTitle>
          <Skeleton className="h-4 w-64 bg-gray-700 mx-auto mt-2" />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-24 bg-gray-700" />
            <Skeleton className="h-10 w-full bg-gray-700" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-24 bg-gray-700" />
            <Skeleton className="h-10 w-full bg-gray-700" />
          </div>
          <div className="w-full flex justify-end">
            <div className="pt-2">
              <Skeleton className="h-10 w-24 bg-gray-700 mx-auto" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
