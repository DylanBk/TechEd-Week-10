import Link from "next/link";

const PaymentSuccess = ({
    searchParams: {amount},
    }: {
    searchParams: {amount: string}
}) => {
    return (
        <main className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-4 items-center">
            <div className="flex flex-col items-center">
                <h2 className="text-8xl text-green-500">Success!</h2>
                <p className="text-lg">Your transaction of {amount} was successful.</p>
            </div>

            <Link
                className="p-2 rounded-sm text-sm underline hover:bg-green-500/5 hover:text-green-500 hover:no-underline transition"
                href='/'>
                Home
            </Link>
        </main>
    );
};

export default PaymentSuccess;