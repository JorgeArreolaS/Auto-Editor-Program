export interface IVideoElement {
    templateConfig: ITemplate,
    recordConfig?: IRecordConfig,
    videoOutput?: Object | any,
    id?:number
}

export interface IElementConfig {
    customDir?: string,
    relativePath?: string,
    log?: boolean,
    preserveProccess?: boolean,
    resolution?: { width: number, height:number }
}

export interface ITemplate {
    name: string,
    plugins?: string[],
    html? : string,
    css?: string,
    javascript?: string,
    processed?: true,
    params?: Object | any,
    fileName?: string,
    customPath?: string,
    customName?: string,
    customMainTemplate?: string,
    outputUrl?: string,
    videoOutput?: Object,
    assets?: IVAsset[],
    resolution?: {width: number, height: number}
}

export interface IPlugin {
    name: string,
    tag: string,
    src?: string
}

export interface IRecordConfig {
    inputUrl: string,
    outNameFile: string,
    duration: number,
    width: number | string,
    height: number | string,
    fps? : number,
    keepFrames? : boolean,
    transparent? :boolean,
}

export interface IElementProcessorState {
    setup: {
        plugins: boolean,
        resources: boolean
    }
}

export interface IRecordHTMLFileConfig {
    roundToEvenWidth: boolean,
    roundToEvenHeight: boolean,
    url: string,
    viewport: { 
        width: number, 
        height: number
    },
    fps: number,
    duration: number,
    keepFrames: boolean,
    output: string,
    quiet: boolean
}

export interface IVAsset {
    default? : string,
    name? : string
    src? : string,
    type? : string}