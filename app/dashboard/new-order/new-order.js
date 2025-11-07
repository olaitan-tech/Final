"use client";
import { db } from "@/config/firebase.config";
import {Button,CircularProgress,FormControl,InputLabel,MenuItem,Select,TextField,
} from "@mui/material";
import { addDoc, collection } from "firebase/firestore";
import { useFormik } from "formik";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import * as yup from "yup";

const schema = yup.object().shape({
  customerName: yup.string().required("Full name is required").min(3),
  foodItem: yup.string().oneOf(["Fried Rice","Grilled Chicken","Spaghetti Alfredo",
"Moimoi","Beef Burger","Jollof Rice & Chicken",]).required("Food item is required"),
 quantity: yup.number().required("Quantity is required").min(1),deliveryDate: yup.date().required("Delivery date is required"),amount: yup.number().required("Total amount is required").min(1000),status: yup.string().oneOf(["Received", "Preparing", "Ready", "Delivered"]).required("Status is required"),notes: yup.string().required("Please add any special note or instruction"),
});

export default function NewOrder() {
  const [progress, setProgress] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: {
        customerName: "",
        foodItem: "",
        quantity: 1,
        deliveryDate: "",
        amount: "",
        status: "",
        notes: "",
      },
      onSubmit: async (values, { resetForm }) => {
        if (!session?.user?.email)
          return alert("You must be logged in to place an order");

        setProgress(true);
        try {
          const docRef = await addDoc(collection(db, "restaurantOrders"), {
            user: session.user.email,
            customerName: values.customerName,
            foodItem: values.foodItem,
            quantity: values.quantity,
            deliveryDate: values.deliveryDate,
            amount: values.amount,
            status: values.status,
            notes: values.notes,
            timeCreated: Date.now(),
          });

          console.log("Order placed with ID:", docRef.id);

          resetForm();
          router.push(
            `/payment?orderId=${docRef.id}&amount=${values.amount}`
          );
        } catch (e) {
          console.error(e);
          alert("Unable to submit order");
        } finally {
          setProgress(false);
        }
      },
      validationSchema: schema,
    });

  return (
    <main className="min-h max-w-xl mx-auto my-10 px-6 py-8 bg-white shadow-lg rounded-xl">
      <h1 className="text-2xl font-semibold mb-6 text-center text-gray-700">
        Aldo's Restaurant Place Your Order
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-5">
        <TextField
          fullWidth
          size="small"
          label="Customer Name"
          value={values.customerName}
          onChange={handleChange}
          onBlur={handleBlur}
          id="customerName"
        />
        {touched.customerName && errors.customerName && (
          <span className="text-red-500 text-xs">{errors.customerName}</span>
        )}
        <FormControl fullWidth>
          <InputLabel id="foodItem-label">Food Item</InputLabel>
          <Select
            labelId="foodItem-label"
            id="foodItem"
            name="foodItem"
            size="small"
            value={values.foodItem}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <MenuItem value="Fried Rice">Fried Rice</MenuItem>
            <MenuItem value="Grilled Chicken">Grilled Chicken</MenuItem>
            <MenuItem value="Spaghetti Alfredo">Spaghetti Alfredo</MenuItem>
            <MenuItem value="Moimoi">Moimoi</MenuItem>
            <MenuItem value="Beef Burger">Beef Burger</MenuItem>
            <MenuItem value="Jollof Rice & Chicken">
              Jollof Rice & Chicken
            </MenuItem>
          </Select>
          {touched.foodItem && errors.foodItem && (
            <span className="text-red-500 text-xs">{errors.foodItem}</span>
          )}
        </FormControl>
        <TextField
          fullWidth
          size="small"
          label="Quantity"
          type="number"
          id="quantity"
          value={values.quantity}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.quantity && errors.quantity && (
          <span className="text-red-500 text-xs">{errors.quantity}</span>
        )}
        <TextField
          fullWidth
          size="small"
          InputLabelProps={{ shrink: true }}
          type="date"
          label="Delivery Date"
          id="deliveryDate"
          value={values.deliveryDate}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.deliveryDate && errors.deliveryDate && (
          <span className="text-red-500 text-xs">{errors.deliveryDate}</span>
        )}
        <TextField
          fullWidth
          size="small"
          label="Total Amount (₦)"
          type="number"
          id="amount"
          value={values.amount}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.amount && errors.amount && (
          <span className="text-red-500 text-xs">{errors.amount}</span>
        )}
        <FormControl fullWidth>
          <InputLabel id="status-label">Order Status</InputLabel>
          <Select
            labelId="status-label"
            id="status"
            size="small"
            name="status"
            value={values.status}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <MenuItem value="Received">Received</MenuItem>
            <MenuItem value="Preparing">Preparing</MenuItem>
            <MenuItem value="Ready">Ready</MenuItem>
            <MenuItem value="Delivered">Delivered</MenuItem>
          </Select>
          {touched.status && errors.status && (
            <span className="text-red-500 text-xs">{errors.status}</span>
          )}
        </FormControl>
        <TextField
          fullWidth
          type="text"
          multiline
          rows={2}
          label="Notes / Special Instructions"
          id="notes"
          value={values.notes}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.notes && errors.notes && (
          <span className="text-red-500 text-xs">{errors.notes}</span>
        )}
        <button
          type="submit"
          className="h-[40px] w-full flex justify-center items-center gap-2 rounded-md shadow-md bg-orange-400 text-white text-lg cursor-pointer"
        >
          Submit Order
          {progress && <CircularProgress color="inherit" size="25px" />}
        </button>
      </form>
    </main>
  );
}
