import {HalLink} from "hal-types";

export default interface MemberType {
    email: string,
    provider: string,
    nickname: string,

    replies: HalLink,
    posts: HalLink,
    uploads: HalLink
}