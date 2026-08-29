import { HeroTree } from "../../headers/hero";
import { aangTree } from "./air/aang";
import { aangFNTree } from "./air/aangFN";
import { borteTree } from "./air/borte";
import { bumiTree } from "./air/bumi";
import { jetsunTree } from "./air/jetsun";
import { jinoraTree } from "./air/jinora";
import { meeloTree } from "./air/meelo";
import { opalTree } from "./air/opal";
import { tenzinTree } from "./air/tenzin";
import { yangchenTree } from "./air/yangchen";
import { zaheerTree } from "./air/zaheer";
import { bolinTree } from "./earth/bolin";
import { caiTree } from "./earth/cai";
import { kingBumiTree } from "./earth/kingBumi";
import { kingBumiMKTree } from "./earth/kingBumiMK";
import { kueiTree } from "./earth/kuei";
import { kuviraTree } from "./earth/kuvira";
import { kyoshiTree } from "./earth/kyoshi";
import { linTree } from "./earth/lin";
import { melonLordTree } from "./earth/melonLord";
import { sukiTree } from "./earth/suki";
import { teoTree } from "./earth/teo";
import { tophTree } from "./earth/toph";
import { tophLBTree } from "./earth/tophLB";
import { asamiTree } from "./fire/asami";
import { azulaTree } from "./fire/azula";
import { irohTree } from "./fire/iroh";
import { kenshiTree } from "./fire/kenshi";
import { makoTree } from "./fire/mako";
import { ozaiTree } from "./fire/ozai";
import { piandaoTree } from "./fire/piandao";
import { rokuTree } from "./fire/roku";
import { tyLeeTree } from "./fire/tyLee";
import { zukoTree } from "./fire/zuko";
import { zukoAHTree } from "./fire/zukoAH";
import { amonTree } from "./water/amon";
import { desnaTree } from "./water/desna";
import { kataraTree } from "./water/katara";
import { kataraPLTree } from "./water/kataraPL";
import { kataraSFTree } from "./water/kataraSF";
import { korraTree } from "./water/korra";
import { korraEqTree } from "./water/korraEq";
import { kurukTree } from "./water/kuruk";
import { phyanTree } from "./water/phyan";
import { sokkaTree } from "./water/sokka";
import { sokkaWWTree } from "./water/sokkaWW";
import { unalaqTree } from "./water/unalaq";
import { yueTree } from "./water/yue";

export const heroMapping: Record<string, HeroTree> = {
    unalaq: unalaqTree,
    korra: korraTree,
    sokka: sokkaTree,
    yue: yueTree,
    phyan: phyanTree,
    katara: kataraTree,
    azula: azulaTree,
    zuko: zukoTree,
    asami: asamiTree,
    kenshi: kenshiTree,
    piandao: piandaoTree,
    iroh: irohTree,
    kyoshi: kyoshiTree,
    cai: caiTree,
    suki: sukiTree,
    kuei: kueiTree,
    teo: teoTree,
    toph: tophTree,
    melonLord: melonLordTree,
    aang: aangTree,
    bumi: bumiTree,
    borte: borteTree,
    meelo: meeloTree,
    tenzin: tenzinTree,
    amon: amonTree,
    kingBumi: kingBumiTree,
    yangchen: yangchenTree,
    kataraPL: kataraPLTree,
    roku: rokuTree,
    ozai: ozaiTree,
    kuvira: kuviraTree,
    kuruk: kurukTree,
    lin: linTree,
    aangFN: aangFNTree,
    zukoAH: zukoAHTree,
    zaheer: zaheerTree,
    sokkaWW: sokkaWWTree,
    jinora: jinoraTree,
    mako: makoTree,
    tophLB: tophLBTree,
    desna: desnaTree,
    opal: opalTree,
    bolin: bolinTree,
    korraEq: korraEqTree,
    jetsun: jetsunTree,
    tyLee: tyLeeTree,
    kataraSF: kataraSFTree,
    kingBumiMK: kingBumiMKTree,
}