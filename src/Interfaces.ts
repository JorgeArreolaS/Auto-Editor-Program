export interface VideoElement {
    templateConfig: Template,
    recordConfig?: RecordConfig,
    videoOutput?: Object
}

export interface Template {
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
    videoOutput?: Object
}

export interface Plugin {
    name: string,
    tag: string,
    src?: string
}

export interface RecordConfig {
    inputUrl: string,
    outNameFile: string,
    duration: number,
    width: number | string,
    height: number | string,
    fps? : number,
    keepFrames? : boolean,
    transparent? :boolean,
    //timecutConfig?: Object
}