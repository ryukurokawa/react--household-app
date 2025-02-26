import {z} from "zod"

export const transactionSchema = z.object({
  type: z.enum(["expense", "income"]),
  date: z.string().min(1, { message: "日付は必須です。" }),
  amount: z.number().min(1, { message: "金額は１円以上必須です。" }),
  content: z
    .string()
    .min(1, { message: "内容の入力は必須です。" })
    .max(50, { message: "内容は５０文字以内にしてください。" }),
  category: z
    .union([
      z.enum(["食費", "日用品", "住居費", "交際費", "娯楽費", "交通費"]),
      z.enum(["給与", "副収入", "お小遣い"]),
      z.literal(""), //空文字列も許容
    ])
    .refine((val) => val !== "", { message: "カテゴリーを選択してください。" }),
});

export type Schema = z.infer<typeof transactionSchema>