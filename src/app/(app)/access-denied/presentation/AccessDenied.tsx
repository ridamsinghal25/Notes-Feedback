import { AlertTriangle } from "lucide-react";

function AccessDenied() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100">
      <div className="max-w-md w-full space-y-8 p-10 bg-white shadow-xl rounded-xl">
        <div className="text-center">
          <AlertTriangle className="mx-auto h-12 w-12 text-yellow-400" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Oops! Limited Access
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Thank you for logging into your account. However, the dashboard is
            only accessible to Admin users.
          </p>
        </div>
        <div className="mt-8 space-y-6 text-center">
          <p className="text-md text-gray-800">
            Please try to access with the link that Admin had provided. You
            might have the necessary permissions now!
          </p>
        </div>
      </div>
    </div>
  );
}

export default AccessDenied;
