import * as mongoose from "mongoose";
declare const User: mongoose.Model<{
    firstname?: string | undefined;
    email?: string | undefined;
    isAdmin?: boolean | undefined;
}, {}, {}, {}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, "type", {
    firstname?: string | undefined;
    email?: string | undefined;
    isAdmin?: boolean | undefined;
}>>;
export { User };
