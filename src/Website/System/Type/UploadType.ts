import {HalLink} from "hal-types";

export default interface UploadType {
    filename: string,
    uuid: string,

    post: HalLink,
    uploader: HalLink
}