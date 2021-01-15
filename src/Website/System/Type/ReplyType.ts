import {HalLink} from "hal-types";

export default interface ReplyType {
    message: string,
    createDate: Date,
    modifiedDate: Date,

    writer: HalLink,
    post: HalLink,
    topic: HalLink,
    replies: HalLink
}