import {HalLink} from "hal-types";

export default interface PostType {
    tag: string,
    title: string,
    content: string,
    createDate: Date,
    modifiedDate: Date,
    views: number,

    writer: HalLink,
    replies: HalLink,
    uploads: HalLink
}