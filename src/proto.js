const protobuf = require("protobufjs/light")
const svgaDescriptor = require("./svga.json")

export const proto = protobuf.Root.fromJSON(svgaDescriptor);
export const ProtoMovieEntity = proto.lookupType("com.opensource.svga.MovieEntity");