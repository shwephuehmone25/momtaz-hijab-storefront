import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { useShopStore } from "@/stores/shop-store";
const schema = z.object({
  firstName: z.string().min(2, "Required"),
  lastName: z.string().min(2, "Required"),
  email: z.email("Enter a valid email"),
  address: z.string().min(5, "Enter your address"),
  city: z.string().min(2, "Required"),
  postalCode: z.string().min(3, "Required"),
  country: z.string().min(2, "Required"),
});
type Data = z.infer<typeof schema>;
export function CheckoutPage() {
  const cart = useShopStore((s) => s.cart);
  const clear = useShopStore((s) => s.clearCart);
  const [complete, setComplete] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Data>({ resolver: zodResolver(schema) });
  const total = cart.reduce((n, i) => n + i.product.price * i.quantity, 0);
  if (complete)
    return (
      <section className="empty page-space">
        <CheckCircle2 />
        <span className="eyebrow">DEMONSTRATION COMPLETE</span>
        <h1>Thank you for exploring Momataz</h1>
        <p>
          Your mock order is confirmed on this device only. Nothing was charged
          or submitted.
        </p>
        <Link className="button" to="/">
          Return home
        </Link>
      </section>
    );
  if (!cart.length)
    return (
      <section className="empty page-space">
        <h1>Your bag is empty</h1>
        <Link className="button" to="/shop">
          Continue shopping
        </Link>
      </section>
    );
  const submit = () => {
    setComplete(true);
    clear();
  };
  return (
    <section className="container page-space checkout">
      <div>
        <span className="eyebrow">MOCK CHECKOUT</span>
        <h1>Delivery details</h1>
        <p className="demo-banner">
          This is a frontend demonstration. Do not enter real payment details.
        </p>
        <form className="form-grid" onSubmit={handleSubmit(submit)} noValidate>
          {[
            ["firstName", "First name"],
            ["lastName", "Last name"],
            ["email", "Email"],
            ["address", "Address"],
            ["city", "City"],
            ["postalCode", "Postal code"],
            ["country", "Country"],
          ].map(([id, label]) => (
            <label
              key={id}
              className={id === "email" || id === "address" ? "span-2" : ""}
            >
              {label}
              <input {...register(id as keyof Data)} />
              {errors[id as keyof Data] && (
                <small className="error">
                  {errors[id as keyof Data]?.message}
                </small>
              )}
            </label>
          ))}
          <Button className="span-2" type="submit">
            Place mock order
          </Button>
        </form>
      </div>
      <aside className="summary">
        <h2>Your order</h2>
        {cart.map((i) => (
          <p key={i.product.id}>
            <span>
              {i.product.name} × {i.quantity}
            </span>
            <b>${(i.product.price * i.quantity).toFixed(2)}</b>
          </p>
        ))}
        <div className="total">
          <span>Total</span>
          <b>${total.toFixed(2)}</b>
        </div>
      </aside>
    </section>
  );
}
