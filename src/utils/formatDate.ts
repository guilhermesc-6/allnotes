import { FirestoreDataConverter } from "firebase/firestore";

export const formatDate = (date: string) => {
  const newDate = date.split(" ");

  return `${newDate[0]}, ${newDate[2]} ${newDate[1]}, ${newDate[3]}`;
};

export function dateFormatFirebase(timestamp: any) {
  if (timestamp) {
    const date = new Date(timestamp.toDate());

    const day = date.getDate();
    const month = `${date.toDateString().split(" ")[1]} ${
      date.toDateString().split(" ")[3]
    }`;

    return `${day} ${month}`;
  }
}
