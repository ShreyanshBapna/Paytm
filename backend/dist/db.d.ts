import mongoose from "mongoose";
export declare const accountModel: mongoose.Model<{
    userId: mongoose.Types.ObjectId;
    balance: number;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    userId: mongoose.Types.ObjectId;
    balance: number;
}, {}, mongoose.DefaultSchemaOptions> & {
    userId: mongoose.Types.ObjectId;
    balance: number;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    userId: mongoose.Types.ObjectId;
    balance: number;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    userId: mongoose.Types.ObjectId;
    balance: number;
}>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<{
    userId: mongoose.Types.ObjectId;
    balance: number;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export declare const transactionModel: mongoose.Model<{
    date: NativeDate;
    from: mongoose.Types.ObjectId;
    to: mongoose.Types.ObjectId;
    amount: number;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    date: NativeDate;
    from: mongoose.Types.ObjectId;
    to: mongoose.Types.ObjectId;
    amount: number;
}, {}, mongoose.DefaultSchemaOptions> & {
    date: NativeDate;
    from: mongoose.Types.ObjectId;
    to: mongoose.Types.ObjectId;
    amount: number;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    date: NativeDate;
    from: mongoose.Types.ObjectId;
    to: mongoose.Types.ObjectId;
    amount: number;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    date: NativeDate;
    from: mongoose.Types.ObjectId;
    to: mongoose.Types.ObjectId;
    amount: number;
}>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<{
    date: NativeDate;
    from: mongoose.Types.ObjectId;
    to: mongoose.Types.ObjectId;
    amount: number;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export declare const userModel: mongoose.Model<{
    firstname?: string | null;
    lastname?: string | null;
    password?: string | null;
    email?: string | null;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    firstname?: string | null;
    lastname?: string | null;
    password?: string | null;
    email?: string | null;
}, {}, mongoose.DefaultSchemaOptions> & {
    firstname?: string | null;
    lastname?: string | null;
    password?: string | null;
    email?: string | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    firstname?: string | null;
    lastname?: string | null;
    password?: string | null;
    email?: string | null;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    firstname?: string | null;
    lastname?: string | null;
    password?: string | null;
    email?: string | null;
}>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<{
    firstname?: string | null;
    lastname?: string | null;
    password?: string | null;
    email?: string | null;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
//# sourceMappingURL=db.d.ts.map