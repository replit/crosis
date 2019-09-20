import * as $protobuf from "protobufjs";
/** Namespace api. */
export namespace api {

    /** Properties of a Command. */
    interface ICommand {

        /** Command channel */
        channel?: (number|null);

        /** Command session */
        session?: (number|null);

        /** Command openChan */
        openChan?: (api.IOpenChannel|null);

        /** Command openChanRes */
        openChanRes?: (api.IOpenChannelRes|null);

        /** Command closeChan */
        closeChan?: (api.ICloseChannel|null);

        /** Command closeChanRes */
        closeChanRes?: (api.ICloseChannel|null);

        /** Command containerState */
        containerState?: (api.IContainerState|null);

        /** Command portOpen */
        portOpen?: (api.IPortOpen|null);

        /** Command toast */
        toast?: (api.IToast|null);

        /** Command runMain */
        runMain?: (api.IRunMain|null);

        /** Command clear */
        clear?: (api.IClear|null);

        /** Command eval */
        "eval"?: (string|null);

        /** Command result */
        result?: (string|null);

        /** Command input */
        input?: (string|null);

        /** Command output */
        output?: (string|null);

        /** Command error */
        error?: (string|null);

        /** Command saneTerm */
        saneTerm?: (api.ISaneTerm|null);

        /** Command resizeTerm */
        resizeTerm?: (api.IResizeTerm|null);

        /** Command state */
        state?: (api.State|null);

        /** Command ok */
        ok?: (api.IOK|null);

        /** Command persist */
        persist?: (api.IFile|null);

        /** Command write */
        write?: (api.IFile|null);

        /** Command remove */
        remove?: (api.IFile|null);

        /** Command move */
        move?: (api.IMove|null);

        /** Command mkdir */
        mkdir?: (api.IFile|null);

        /** Command read */
        read?: (api.IFile|null);

        /** Command readdir */
        readdir?: (api.IFile|null);

        /** Command files */
        files?: (api.IFiles|null);

        /** Command file */
        file?: (api.IFile|null);

        /** Command checkChanges */
        checkChanges?: (api.ICheckChanges|null);

        /** Command changedFiles */
        changedFiles?: (api.IFiles|null);

        /** Command lintResults */
        lintResults?: (api.ILintResults|null);

        /** Command runContainedTest */
        runContainedTest?: (api.IContainedTest|null);

        /** Command testResult */
        testResult?: (api.ITestResult|null);

        /** Command debuggerStart */
        debuggerStart?: (string|null);

        /** Command debuggerStep */
        debuggerStep?: (api.IRunMain|null);

        /** Command debuggerStatus */
        debuggerStatus?: (api.IDebugStatus|null);

        /** Command ensurePackages */
        ensurePackages?: (api.IEnsurePackages|null);

        /** Command ping */
        ping?: (api.IPing|null);

        /** Command pong */
        pong?: (api.IPong|null);

        /** Command hello */
        hello?: (api.IHello|null);

        /** Command goodbye */
        goodbye?: (api.IGoodbye|null);

        /** Command hint */
        hint?: (api.IHint|null);

        /** Command connect */
        connect?: (api.IConnect|null);

        /** Command send */
        send?: (api.ISend|null);

        /** Command recv */
        recv?: (api.IRecv|null);

        /** Command disconnect */
        disconnect?: (api.IDisconnect|null);

        /** Command fileAuthReq */
        fileAuthReq?: (api.IFileAuthReq|null);

        /** Command fileAuthRes */
        fileAuthRes?: (api.IFileAuthRes|null);

        /** Command mutliFileAuthRes */
        mutliFileAuthRes?: (api.IMultiFileAuthRes|null);

        /** Command ot */
        ot?: (api.IOTPacket|null);

        /** Command otstatus */
        otstatus?: (api.IOTStatus|null);

        /** Command otLinkFile */
        otLinkFile?: (api.IOTLinkFile|null);

        /** Command otNewCursor */
        otNewCursor?: (api.IOTCursor|null);

        /** Command otDeleteCursor */
        otDeleteCursor?: (api.IOTCursor|null);

        /** Command flush */
        flush?: (api.IFlush|null);

        /** Command debug */
        debug?: (api.IDebug|null);

        /** Command startVCR */
        startVCR?: (api.IStartVCR|null);

        /** Command readVCR */
        readVCR?: (api.IReadVCR|null);

        /** Command VCRLog */
        VCRLog?: (api.IVCRLog|null);

        /** Command auth */
        auth?: (api.IAuth|null);

        /** Command execInfo */
        execInfo?: (api.IExecInfo|null);

        /** Command subscribe */
        subscribe?: (api.IFile|null);

        /** Command eventCreated */
        eventCreated?: (api.IFile|null);

        /** Command eventModified */
        eventModified?: (api.IFile|null);

        /** Command eventDeleted */
        eventDeleted?: (api.IFile|null);

        /** Command eventMoved */
        eventMoved?: (api.IMove|null);

        /** Command subscribeFile */
        subscribeFile?: (api.ISubscribeFile|null);

        /** Command fileEvent */
        fileEvent?: (api.IFileEvent|null);

        /** Command roster */
        roster?: (api.IRoster|null);

        /** Command join */
        join?: (api.IUser|null);

        /** Command part */
        part?: (api.IUser|null);

        /** Command exec */
        exec?: (api.IExec|null);

        /** Command packageSearch */
        packageSearch?: (api.IPackageSearch|null);

        /** Command packageSearchResp */
        packageSearchResp?: (api.IPackageSearchResp|null);

        /** Command packageInfo */
        packageInfo?: (api.IPackageInfo|null);

        /** Command packageInfoResp */
        packageInfoResp?: (api.IPackageInfoResp|null);

        /** Command packageAdd */
        packageAdd?: (api.IPackageAdd|null);

        /** Command packageRemove */
        packageRemove?: (api.IPackageRemove|null);

        /** Command packageInstall */
        packageInstall?: (api.IPackageInstall|null);

        /** Command packageListSpecfile */
        packageListSpecfile?: (api.IPackageListSpecfile|null);

        /** Command packageListSpecfileResp */
        packageListSpecfileResp?: (api.IPackageListSpecfileResp|null);

        /** Command packageCacheSave */
        packageCacheSave?: (api.IPackageCacheSave|null);

        /** Command chatMessage */
        chatMessage?: (api.IChatMessage|null);

        /** Command chatTyping */
        chatTyping?: (api.IChatTyping|null);

        /** Command chatScrollback */
        chatScrollback?: (api.IChatScrollback|null);

        /** Command ref */
        ref?: (string|null);
    }

    /** Represents a Command. */
    class Command implements ICommand {

        /**
         * Constructs a new Command.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.ICommand);

        /** Command channel. */
        public channel: number;

        /** Command session. */
        public session: number;

        /** Command openChan. */
        public openChan?: (api.IOpenChannel|null);

        /** Command openChanRes. */
        public openChanRes?: (api.IOpenChannelRes|null);

        /** Command closeChan. */
        public closeChan?: (api.ICloseChannel|null);

        /** Command closeChanRes. */
        public closeChanRes?: (api.ICloseChannel|null);

        /** Command containerState. */
        public containerState?: (api.IContainerState|null);

        /** Command portOpen. */
        public portOpen?: (api.IPortOpen|null);

        /** Command toast. */
        public toast?: (api.IToast|null);

        /** Command runMain. */
        public runMain?: (api.IRunMain|null);

        /** Command clear. */
        public clear?: (api.IClear|null);

        /** Command eval. */
        public eval: string;

        /** Command result. */
        public result: string;

        /** Command input. */
        public input: string;

        /** Command output. */
        public output: string;

        /** Command error. */
        public error: string;

        /** Command saneTerm. */
        public saneTerm?: (api.ISaneTerm|null);

        /** Command resizeTerm. */
        public resizeTerm?: (api.IResizeTerm|null);

        /** Command state. */
        public state: api.State;

        /** Command ok. */
        public ok?: (api.IOK|null);

        /** Command persist. */
        public persist?: (api.IFile|null);

        /** Command write. */
        public write?: (api.IFile|null);

        /** Command remove. */
        public remove?: (api.IFile|null);

        /** Command move. */
        public move?: (api.IMove|null);

        /** Command mkdir. */
        public mkdir?: (api.IFile|null);

        /** Command read. */
        public read?: (api.IFile|null);

        /** Command readdir. */
        public readdir?: (api.IFile|null);

        /** Command files. */
        public files?: (api.IFiles|null);

        /** Command file. */
        public file?: (api.IFile|null);

        /** Command checkChanges. */
        public checkChanges?: (api.ICheckChanges|null);

        /** Command changedFiles. */
        public changedFiles?: (api.IFiles|null);

        /** Command lintResults. */
        public lintResults?: (api.ILintResults|null);

        /** Command runContainedTest. */
        public runContainedTest?: (api.IContainedTest|null);

        /** Command testResult. */
        public testResult?: (api.ITestResult|null);

        /** Command debuggerStart. */
        public debuggerStart: string;

        /** Command debuggerStep. */
        public debuggerStep?: (api.IRunMain|null);

        /** Command debuggerStatus. */
        public debuggerStatus?: (api.IDebugStatus|null);

        /** Command ensurePackages. */
        public ensurePackages?: (api.IEnsurePackages|null);

        /** Command ping. */
        public ping?: (api.IPing|null);

        /** Command pong. */
        public pong?: (api.IPong|null);

        /** Command hello. */
        public hello?: (api.IHello|null);

        /** Command goodbye. */
        public goodbye?: (api.IGoodbye|null);

        /** Command hint. */
        public hint?: (api.IHint|null);

        /** Command connect. */
        public connect?: (api.IConnect|null);

        /** Command send. */
        public send?: (api.ISend|null);

        /** Command recv. */
        public recv?: (api.IRecv|null);

        /** Command disconnect. */
        public disconnect?: (api.IDisconnect|null);

        /** Command fileAuthReq. */
        public fileAuthReq?: (api.IFileAuthReq|null);

        /** Command fileAuthRes. */
        public fileAuthRes?: (api.IFileAuthRes|null);

        /** Command mutliFileAuthRes. */
        public mutliFileAuthRes?: (api.IMultiFileAuthRes|null);

        /** Command ot. */
        public ot?: (api.IOTPacket|null);

        /** Command otstatus. */
        public otstatus?: (api.IOTStatus|null);

        /** Command otLinkFile. */
        public otLinkFile?: (api.IOTLinkFile|null);

        /** Command otNewCursor. */
        public otNewCursor?: (api.IOTCursor|null);

        /** Command otDeleteCursor. */
        public otDeleteCursor?: (api.IOTCursor|null);

        /** Command flush. */
        public flush?: (api.IFlush|null);

        /** Command debug. */
        public debug?: (api.IDebug|null);

        /** Command startVCR. */
        public startVCR?: (api.IStartVCR|null);

        /** Command readVCR. */
        public readVCR?: (api.IReadVCR|null);

        /** Command VCRLog. */
        public VCRLog?: (api.IVCRLog|null);

        /** Command auth. */
        public auth?: (api.IAuth|null);

        /** Command execInfo. */
        public execInfo?: (api.IExecInfo|null);

        /** Command subscribe. */
        public subscribe?: (api.IFile|null);

        /** Command eventCreated. */
        public eventCreated?: (api.IFile|null);

        /** Command eventModified. */
        public eventModified?: (api.IFile|null);

        /** Command eventDeleted. */
        public eventDeleted?: (api.IFile|null);

        /** Command eventMoved. */
        public eventMoved?: (api.IMove|null);

        /** Command subscribeFile. */
        public subscribeFile?: (api.ISubscribeFile|null);

        /** Command fileEvent. */
        public fileEvent?: (api.IFileEvent|null);

        /** Command roster. */
        public roster?: (api.IRoster|null);

        /** Command join. */
        public join?: (api.IUser|null);

        /** Command part. */
        public part?: (api.IUser|null);

        /** Command exec. */
        public exec?: (api.IExec|null);

        /** Command packageSearch. */
        public packageSearch?: (api.IPackageSearch|null);

        /** Command packageSearchResp. */
        public packageSearchResp?: (api.IPackageSearchResp|null);

        /** Command packageInfo. */
        public packageInfo?: (api.IPackageInfo|null);

        /** Command packageInfoResp. */
        public packageInfoResp?: (api.IPackageInfoResp|null);

        /** Command packageAdd. */
        public packageAdd?: (api.IPackageAdd|null);

        /** Command packageRemove. */
        public packageRemove?: (api.IPackageRemove|null);

        /** Command packageInstall. */
        public packageInstall?: (api.IPackageInstall|null);

        /** Command packageListSpecfile. */
        public packageListSpecfile?: (api.IPackageListSpecfile|null);

        /** Command packageListSpecfileResp. */
        public packageListSpecfileResp?: (api.IPackageListSpecfileResp|null);

        /** Command packageCacheSave. */
        public packageCacheSave?: (api.IPackageCacheSave|null);

        /** Command chatMessage. */
        public chatMessage?: (api.IChatMessage|null);

        /** Command chatTyping. */
        public chatTyping?: (api.IChatTyping|null);

        /** Command chatScrollback. */
        public chatScrollback?: (api.IChatScrollback|null);

        /** Command ref. */
        public ref: string;

        /** Command body. */
        public body?: ("openChan"|"openChanRes"|"closeChan"|"closeChanRes"|"containerState"|"portOpen"|"toast"|"runMain"|"clear"|"eval"|"result"|"input"|"output"|"error"|"saneTerm"|"resizeTerm"|"state"|"ok"|"persist"|"write"|"remove"|"move"|"mkdir"|"read"|"readdir"|"files"|"file"|"checkChanges"|"changedFiles"|"lintResults"|"runContainedTest"|"testResult"|"debuggerStart"|"debuggerStep"|"debuggerStatus"|"ensurePackages"|"ping"|"pong"|"hello"|"goodbye"|"hint"|"connect"|"send"|"recv"|"disconnect"|"fileAuthReq"|"fileAuthRes"|"mutliFileAuthRes"|"ot"|"otstatus"|"otLinkFile"|"otNewCursor"|"otDeleteCursor"|"flush"|"debug"|"startVCR"|"readVCR"|"VCRLog"|"auth"|"execInfo"|"subscribe"|"eventCreated"|"eventModified"|"eventDeleted"|"eventMoved"|"subscribeFile"|"fileEvent"|"roster"|"join"|"part"|"exec"|"packageSearch"|"packageSearchResp"|"packageInfo"|"packageInfoResp"|"packageAdd"|"packageRemove"|"packageInstall"|"packageListSpecfile"|"packageListSpecfileResp"|"packageCacheSave"|"chatMessage"|"chatTyping"|"chatScrollback");

        /**
         * Creates a new Command instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Command instance
         */
        public static create(properties?: api.ICommand): api.Command;

        /**
         * Encodes the specified Command message. Does not implicitly {@link api.Command.verify|verify} messages.
         * @param message Command message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.ICommand, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Command message, length delimited. Does not implicitly {@link api.Command.verify|verify} messages.
         * @param message Command message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.ICommand, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Command message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Command
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.Command;

        /**
         * Decodes a Command message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Command
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.Command;

        /**
         * Verifies a Command message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Command message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Command
         */
        public static fromObject(object: { [k: string]: any }): api.Command;

        /**
         * Creates a plain object from a Command message. Also converts values to other types if specified.
         * @param message Command
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.Command, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Command to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a SubscribeFile. */
    interface ISubscribeFile {

        /** SubscribeFile files */
        files?: (api.IFile[]|null);
    }

    /** Represents a SubscribeFile. */
    class SubscribeFile implements ISubscribeFile {

        /**
         * Constructs a new SubscribeFile.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.ISubscribeFile);

        /** SubscribeFile files. */
        public files: api.IFile[];

        /**
         * Creates a new SubscribeFile instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SubscribeFile instance
         */
        public static create(properties?: api.ISubscribeFile): api.SubscribeFile;

        /**
         * Encodes the specified SubscribeFile message. Does not implicitly {@link api.SubscribeFile.verify|verify} messages.
         * @param message SubscribeFile message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.ISubscribeFile, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SubscribeFile message, length delimited. Does not implicitly {@link api.SubscribeFile.verify|verify} messages.
         * @param message SubscribeFile message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.ISubscribeFile, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SubscribeFile message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SubscribeFile
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.SubscribeFile;

        /**
         * Decodes a SubscribeFile message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SubscribeFile
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.SubscribeFile;

        /**
         * Verifies a SubscribeFile message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SubscribeFile message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SubscribeFile
         */
        public static fromObject(object: { [k: string]: any }): api.SubscribeFile;

        /**
         * Creates a plain object from a SubscribeFile message. Also converts values to other types if specified.
         * @param message SubscribeFile
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.SubscribeFile, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SubscribeFile to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a FileEvent. */
    interface IFileEvent {

        /** FileEvent file */
        file?: (api.IFile|null);

        /** FileEvent dest */
        dest?: (api.IFile|null);

        /** FileEvent op */
        op?: (api.FileEvent.Op|null);
    }

    /** Represents a FileEvent. */
    class FileEvent implements IFileEvent {

        /**
         * Constructs a new FileEvent.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IFileEvent);

        /** FileEvent file. */
        public file?: (api.IFile|null);

        /** FileEvent dest. */
        public dest?: (api.IFile|null);

        /** FileEvent op. */
        public op: api.FileEvent.Op;

        /**
         * Creates a new FileEvent instance using the specified properties.
         * @param [properties] Properties to set
         * @returns FileEvent instance
         */
        public static create(properties?: api.IFileEvent): api.FileEvent;

        /**
         * Encodes the specified FileEvent message. Does not implicitly {@link api.FileEvent.verify|verify} messages.
         * @param message FileEvent message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IFileEvent, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified FileEvent message, length delimited. Does not implicitly {@link api.FileEvent.verify|verify} messages.
         * @param message FileEvent message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IFileEvent, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a FileEvent message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns FileEvent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.FileEvent;

        /**
         * Decodes a FileEvent message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns FileEvent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.FileEvent;

        /**
         * Verifies a FileEvent message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a FileEvent message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns FileEvent
         */
        public static fromObject(object: { [k: string]: any }): api.FileEvent;

        /**
         * Creates a plain object from a FileEvent message. Also converts values to other types if specified.
         * @param message FileEvent
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.FileEvent, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this FileEvent to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    namespace FileEvent {

        /** Op enum. */
        enum Op {
            Create = 0,
            Move = 1,
            Remove = 2,
            Modify = 3
        }
    }

    /** Properties of a Flush. */
    interface IFlush {
    }

    /** Represents a Flush. */
    class Flush implements IFlush {

        /**
         * Constructs a new Flush.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IFlush);

        /**
         * Creates a new Flush instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Flush instance
         */
        public static create(properties?: api.IFlush): api.Flush;

        /**
         * Encodes the specified Flush message. Does not implicitly {@link api.Flush.verify|verify} messages.
         * @param message Flush message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IFlush, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Flush message, length delimited. Does not implicitly {@link api.Flush.verify|verify} messages.
         * @param message Flush message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IFlush, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Flush message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Flush
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.Flush;

        /**
         * Decodes a Flush message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Flush
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.Flush;

        /**
         * Verifies a Flush message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Flush message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Flush
         */
        public static fromObject(object: { [k: string]: any }): api.Flush;

        /**
         * Creates a plain object from a Flush message. Also converts values to other types if specified.
         * @param message Flush
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.Flush, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Flush to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a OTLinkFile. */
    interface IOTLinkFile {

        /** OTLinkFile file */
        file?: (api.IFile|null);
    }

    /** Represents a OTLinkFile. */
    class OTLinkFile implements IOTLinkFile {

        /**
         * Constructs a new OTLinkFile.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IOTLinkFile);

        /** OTLinkFile file. */
        public file?: (api.IFile|null);

        /**
         * Creates a new OTLinkFile instance using the specified properties.
         * @param [properties] Properties to set
         * @returns OTLinkFile instance
         */
        public static create(properties?: api.IOTLinkFile): api.OTLinkFile;

        /**
         * Encodes the specified OTLinkFile message. Does not implicitly {@link api.OTLinkFile.verify|verify} messages.
         * @param message OTLinkFile message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IOTLinkFile, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified OTLinkFile message, length delimited. Does not implicitly {@link api.OTLinkFile.verify|verify} messages.
         * @param message OTLinkFile message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IOTLinkFile, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a OTLinkFile message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns OTLinkFile
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.OTLinkFile;

        /**
         * Decodes a OTLinkFile message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns OTLinkFile
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.OTLinkFile;

        /**
         * Verifies a OTLinkFile message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a OTLinkFile message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns OTLinkFile
         */
        public static fromObject(object: { [k: string]: any }): api.OTLinkFile;

        /**
         * Creates a plain object from a OTLinkFile message. Also converts values to other types if specified.
         * @param message OTLinkFile
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.OTLinkFile, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this OTLinkFile to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an Auth. */
    interface IAuth {

        /** Auth token */
        token?: (string|null);

        /** Auth containerID */
        containerID?: (string|null);
    }

    /** Represents an Auth. */
    class Auth implements IAuth {

        /**
         * Constructs a new Auth.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IAuth);

        /** Auth token. */
        public token: string;

        /** Auth containerID. */
        public containerID: string;

        /**
         * Creates a new Auth instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Auth instance
         */
        public static create(properties?: api.IAuth): api.Auth;

        /**
         * Encodes the specified Auth message. Does not implicitly {@link api.Auth.verify|verify} messages.
         * @param message Auth message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IAuth, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Auth message, length delimited. Does not implicitly {@link api.Auth.verify|verify} messages.
         * @param message Auth message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IAuth, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an Auth message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Auth
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.Auth;

        /**
         * Decodes an Auth message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Auth
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.Auth;

        /**
         * Verifies an Auth message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an Auth message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Auth
         */
        public static fromObject(object: { [k: string]: any }): api.Auth;

        /**
         * Creates a plain object from an Auth message. Also converts values to other types if specified.
         * @param message Auth
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.Auth, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Auth to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a VCREntry. */
    interface IVCREntry {

        /** VCREntry timestamp */
        timestamp?: (number|Long|null);

        /** VCREntry direction */
        direction?: (api.VCREntry.Direction|null);

        /** VCREntry command */
        command?: (api.ICommand|null);

        /** VCREntry uid */
        uid?: (string|null);
    }

    /** Represents a VCREntry. */
    class VCREntry implements IVCREntry {

        /**
         * Constructs a new VCREntry.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IVCREntry);

        /** VCREntry timestamp. */
        public timestamp: (number|Long);

        /** VCREntry direction. */
        public direction: api.VCREntry.Direction;

        /** VCREntry command. */
        public command?: (api.ICommand|null);

        /** VCREntry uid. */
        public uid: string;

        /**
         * Creates a new VCREntry instance using the specified properties.
         * @param [properties] Properties to set
         * @returns VCREntry instance
         */
        public static create(properties?: api.IVCREntry): api.VCREntry;

        /**
         * Encodes the specified VCREntry message. Does not implicitly {@link api.VCREntry.verify|verify} messages.
         * @param message VCREntry message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IVCREntry, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified VCREntry message, length delimited. Does not implicitly {@link api.VCREntry.verify|verify} messages.
         * @param message VCREntry message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IVCREntry, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a VCREntry message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns VCREntry
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.VCREntry;

        /**
         * Decodes a VCREntry message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns VCREntry
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.VCREntry;

        /**
         * Verifies a VCREntry message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a VCREntry message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns VCREntry
         */
        public static fromObject(object: { [k: string]: any }): api.VCREntry;

        /**
         * Creates a plain object from a VCREntry message. Also converts values to other types if specified.
         * @param message VCREntry
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.VCREntry, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this VCREntry to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    namespace VCREntry {

        /** Direction enum. */
        enum Direction {
            IN = 0,
            OUT = 1
        }
    }

    /** Properties of a StartVCR. */
    interface IStartVCR {
    }

    /** Represents a StartVCR. */
    class StartVCR implements IStartVCR {

        /**
         * Constructs a new StartVCR.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IStartVCR);

        /**
         * Creates a new StartVCR instance using the specified properties.
         * @param [properties] Properties to set
         * @returns StartVCR instance
         */
        public static create(properties?: api.IStartVCR): api.StartVCR;

        /**
         * Encodes the specified StartVCR message. Does not implicitly {@link api.StartVCR.verify|verify} messages.
         * @param message StartVCR message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IStartVCR, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified StartVCR message, length delimited. Does not implicitly {@link api.StartVCR.verify|verify} messages.
         * @param message StartVCR message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IStartVCR, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a StartVCR message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns StartVCR
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.StartVCR;

        /**
         * Decodes a StartVCR message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns StartVCR
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.StartVCR;

        /**
         * Verifies a StartVCR message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a StartVCR message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns StartVCR
         */
        public static fromObject(object: { [k: string]: any }): api.StartVCR;

        /**
         * Creates a plain object from a StartVCR message. Also converts values to other types if specified.
         * @param message StartVCR
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.StartVCR, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this StartVCR to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ReadVCR. */
    interface IReadVCR {
    }

    /** Represents a ReadVCR. */
    class ReadVCR implements IReadVCR {

        /**
         * Constructs a new ReadVCR.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IReadVCR);

        /**
         * Creates a new ReadVCR instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ReadVCR instance
         */
        public static create(properties?: api.IReadVCR): api.ReadVCR;

        /**
         * Encodes the specified ReadVCR message. Does not implicitly {@link api.ReadVCR.verify|verify} messages.
         * @param message ReadVCR message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IReadVCR, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ReadVCR message, length delimited. Does not implicitly {@link api.ReadVCR.verify|verify} messages.
         * @param message ReadVCR message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IReadVCR, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ReadVCR message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ReadVCR
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.ReadVCR;

        /**
         * Decodes a ReadVCR message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ReadVCR
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.ReadVCR;

        /**
         * Verifies a ReadVCR message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ReadVCR message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ReadVCR
         */
        public static fromObject(object: { [k: string]: any }): api.ReadVCR;

        /**
         * Creates a plain object from a ReadVCR message. Also converts values to other types if specified.
         * @param message ReadVCR
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.ReadVCR, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ReadVCR to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a VCRLog. */
    interface IVCRLog {

        /** VCRLog log */
        log?: (api.IVCREntry[]|null);

        /** VCRLog logfile */
        logfile?: (api.IFile|null);
    }

    /** Represents a VCRLog. */
    class VCRLog implements IVCRLog {

        /**
         * Constructs a new VCRLog.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IVCRLog);

        /** VCRLog log. */
        public log: api.IVCREntry[];

        /** VCRLog logfile. */
        public logfile?: (api.IFile|null);

        /**
         * Creates a new VCRLog instance using the specified properties.
         * @param [properties] Properties to set
         * @returns VCRLog instance
         */
        public static create(properties?: api.IVCRLog): api.VCRLog;

        /**
         * Encodes the specified VCRLog message. Does not implicitly {@link api.VCRLog.verify|verify} messages.
         * @param message VCRLog message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IVCRLog, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified VCRLog message, length delimited. Does not implicitly {@link api.VCRLog.verify|verify} messages.
         * @param message VCRLog message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IVCRLog, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a VCRLog message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns VCRLog
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.VCRLog;

        /**
         * Decodes a VCRLog message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns VCRLog
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.VCRLog;

        /**
         * Verifies a VCRLog message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a VCRLog message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns VCRLog
         */
        public static fromObject(object: { [k: string]: any }): api.VCRLog;

        /**
         * Creates a plain object from a VCRLog message. Also converts values to other types if specified.
         * @param message VCRLog
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.VCRLog, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this VCRLog to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an ExecInfo. */
    interface IExecInfo {

        /** ExecInfo command */
        command?: (string[]|null);

        /** ExecInfo reason */
        reason?: (string|null);
    }

    /** Represents an ExecInfo. */
    class ExecInfo implements IExecInfo {

        /**
         * Constructs a new ExecInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IExecInfo);

        /** ExecInfo command. */
        public command: string[];

        /** ExecInfo reason. */
        public reason: string;

        /**
         * Creates a new ExecInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ExecInfo instance
         */
        public static create(properties?: api.IExecInfo): api.ExecInfo;

        /**
         * Encodes the specified ExecInfo message. Does not implicitly {@link api.ExecInfo.verify|verify} messages.
         * @param message ExecInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IExecInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ExecInfo message, length delimited. Does not implicitly {@link api.ExecInfo.verify|verify} messages.
         * @param message ExecInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IExecInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an ExecInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ExecInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.ExecInfo;

        /**
         * Decodes an ExecInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ExecInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.ExecInfo;

        /**
         * Verifies an ExecInfo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an ExecInfo message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ExecInfo
         */
        public static fromObject(object: { [k: string]: any }): api.ExecInfo;

        /**
         * Creates a plain object from an ExecInfo message. Also converts values to other types if specified.
         * @param message ExecInfo
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.ExecInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ExecInfo to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Debug. */
    interface IDebug {

        /** Debug text */
        text?: (string|null);
    }

    /** Represents a Debug. */
    class Debug implements IDebug {

        /**
         * Constructs a new Debug.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IDebug);

        /** Debug text. */
        public text: string;

        /**
         * Creates a new Debug instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Debug instance
         */
        public static create(properties?: api.IDebug): api.Debug;

        /**
         * Encodes the specified Debug message. Does not implicitly {@link api.Debug.verify|verify} messages.
         * @param message Debug message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IDebug, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Debug message, length delimited. Does not implicitly {@link api.Debug.verify|verify} messages.
         * @param message Debug message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IDebug, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Debug message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Debug
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.Debug;

        /**
         * Decodes a Debug message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Debug
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.Debug;

        /**
         * Verifies a Debug message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Debug message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Debug
         */
        public static fromObject(object: { [k: string]: any }): api.Debug;

        /**
         * Creates a plain object from a Debug message. Also converts values to other types if specified.
         * @param message Debug
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.Debug, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Debug to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** FileAuthMethod enum. */
    enum FileAuthMethod {
        GET = 0,
        HEAD = 1,
        PUT = 2,
        DELETE = 3
    }

    /** Properties of a FileAuthReq. */
    interface IFileAuthReq {

        /** FileAuthReq file */
        file?: (api.IFile|null);

        /** FileAuthReq method */
        method?: (api.FileAuthMethod|null);
    }

    /** Represents a FileAuthReq. */
    class FileAuthReq implements IFileAuthReq {

        /**
         * Constructs a new FileAuthReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IFileAuthReq);

        /** FileAuthReq file. */
        public file?: (api.IFile|null);

        /** FileAuthReq method. */
        public method: api.FileAuthMethod;

        /**
         * Creates a new FileAuthReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns FileAuthReq instance
         */
        public static create(properties?: api.IFileAuthReq): api.FileAuthReq;

        /**
         * Encodes the specified FileAuthReq message. Does not implicitly {@link api.FileAuthReq.verify|verify} messages.
         * @param message FileAuthReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IFileAuthReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified FileAuthReq message, length delimited. Does not implicitly {@link api.FileAuthReq.verify|verify} messages.
         * @param message FileAuthReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IFileAuthReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a FileAuthReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns FileAuthReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.FileAuthReq;

        /**
         * Decodes a FileAuthReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns FileAuthReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.FileAuthReq;

        /**
         * Verifies a FileAuthReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a FileAuthReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns FileAuthReq
         */
        public static fromObject(object: { [k: string]: any }): api.FileAuthReq;

        /**
         * Creates a plain object from a FileAuthReq message. Also converts values to other types if specified.
         * @param message FileAuthReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.FileAuthReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this FileAuthReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a MultiFileAuthRes. */
    interface IMultiFileAuthRes {

        /** MultiFileAuthRes put */
        put?: (api.IFileAuthRes|null);

        /** MultiFileAuthRes del */
        del?: (api.IFileAuthRes|null);
    }

    /** Represents a MultiFileAuthRes. */
    class MultiFileAuthRes implements IMultiFileAuthRes {

        /**
         * Constructs a new MultiFileAuthRes.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IMultiFileAuthRes);

        /** MultiFileAuthRes put. */
        public put?: (api.IFileAuthRes|null);

        /** MultiFileAuthRes del. */
        public del?: (api.IFileAuthRes|null);

        /**
         * Creates a new MultiFileAuthRes instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MultiFileAuthRes instance
         */
        public static create(properties?: api.IMultiFileAuthRes): api.MultiFileAuthRes;

        /**
         * Encodes the specified MultiFileAuthRes message. Does not implicitly {@link api.MultiFileAuthRes.verify|verify} messages.
         * @param message MultiFileAuthRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IMultiFileAuthRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified MultiFileAuthRes message, length delimited. Does not implicitly {@link api.MultiFileAuthRes.verify|verify} messages.
         * @param message MultiFileAuthRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IMultiFileAuthRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a MultiFileAuthRes message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MultiFileAuthRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.MultiFileAuthRes;

        /**
         * Decodes a MultiFileAuthRes message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MultiFileAuthRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.MultiFileAuthRes;

        /**
         * Verifies a MultiFileAuthRes message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a MultiFileAuthRes message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns MultiFileAuthRes
         */
        public static fromObject(object: { [k: string]: any }): api.MultiFileAuthRes;

        /**
         * Creates a plain object from a MultiFileAuthRes message. Also converts values to other types if specified.
         * @param message MultiFileAuthRes
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.MultiFileAuthRes, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this MultiFileAuthRes to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a FileAuthRes. */
    interface IFileAuthRes {

        /** FileAuthRes file */
        file?: (api.IFile|null);

        /** FileAuthRes url */
        url?: (string|null);

        /** FileAuthRes method */
        method?: (api.FileAuthMethod|null);

        /** FileAuthRes expire */
        expire?: (number|Long|null);

        /** FileAuthRes error */
        error?: (string|null);
    }

    /** Represents a FileAuthRes. */
    class FileAuthRes implements IFileAuthRes {

        /**
         * Constructs a new FileAuthRes.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IFileAuthRes);

        /** FileAuthRes file. */
        public file?: (api.IFile|null);

        /** FileAuthRes url. */
        public url: string;

        /** FileAuthRes method. */
        public method: api.FileAuthMethod;

        /** FileAuthRes expire. */
        public expire: (number|Long);

        /** FileAuthRes error. */
        public error: string;

        /**
         * Creates a new FileAuthRes instance using the specified properties.
         * @param [properties] Properties to set
         * @returns FileAuthRes instance
         */
        public static create(properties?: api.IFileAuthRes): api.FileAuthRes;

        /**
         * Encodes the specified FileAuthRes message. Does not implicitly {@link api.FileAuthRes.verify|verify} messages.
         * @param message FileAuthRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IFileAuthRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified FileAuthRes message, length delimited. Does not implicitly {@link api.FileAuthRes.verify|verify} messages.
         * @param message FileAuthRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IFileAuthRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a FileAuthRes message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns FileAuthRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.FileAuthRes;

        /**
         * Decodes a FileAuthRes message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns FileAuthRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.FileAuthRes;

        /**
         * Verifies a FileAuthRes message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a FileAuthRes message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns FileAuthRes
         */
        public static fromObject(object: { [k: string]: any }): api.FileAuthRes;

        /**
         * Creates a plain object from a FileAuthRes message. Also converts values to other types if specified.
         * @param message FileAuthRes
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.FileAuthRes, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this FileAuthRes to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Disconnect. */
    interface IDisconnect {

        /** Disconnect error */
        error?: (string|null);
    }

    /** Represents a Disconnect. */
    class Disconnect implements IDisconnect {

        /**
         * Constructs a new Disconnect.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IDisconnect);

        /** Disconnect error. */
        public error: string;

        /**
         * Creates a new Disconnect instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Disconnect instance
         */
        public static create(properties?: api.IDisconnect): api.Disconnect;

        /**
         * Encodes the specified Disconnect message. Does not implicitly {@link api.Disconnect.verify|verify} messages.
         * @param message Disconnect message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IDisconnect, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Disconnect message, length delimited. Does not implicitly {@link api.Disconnect.verify|verify} messages.
         * @param message Disconnect message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IDisconnect, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Disconnect message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Disconnect
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.Disconnect;

        /**
         * Decodes a Disconnect message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Disconnect
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.Disconnect;

        /**
         * Verifies a Disconnect message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Disconnect message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Disconnect
         */
        public static fromObject(object: { [k: string]: any }): api.Disconnect;

        /**
         * Creates a plain object from a Disconnect message. Also converts values to other types if specified.
         * @param message Disconnect
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.Disconnect, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Disconnect to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Send. */
    interface ISend {

        /** Send buff */
        buff?: (Uint8Array|null);
    }

    /** Represents a Send. */
    class Send implements ISend {

        /**
         * Constructs a new Send.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.ISend);

        /** Send buff. */
        public buff: Uint8Array;

        /**
         * Creates a new Send instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Send instance
         */
        public static create(properties?: api.ISend): api.Send;

        /**
         * Encodes the specified Send message. Does not implicitly {@link api.Send.verify|verify} messages.
         * @param message Send message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.ISend, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Send message, length delimited. Does not implicitly {@link api.Send.verify|verify} messages.
         * @param message Send message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.ISend, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Send message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Send
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.Send;

        /**
         * Decodes a Send message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Send
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.Send;

        /**
         * Verifies a Send message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Send message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Send
         */
        public static fromObject(object: { [k: string]: any }): api.Send;

        /**
         * Creates a plain object from a Send message. Also converts values to other types if specified.
         * @param message Send
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.Send, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Send to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Recv. */
    interface IRecv {

        /** Recv buff */
        buff?: (Uint8Array|null);
    }

    /** Represents a Recv. */
    class Recv implements IRecv {

        /**
         * Constructs a new Recv.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IRecv);

        /** Recv buff. */
        public buff: Uint8Array;

        /**
         * Creates a new Recv instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Recv instance
         */
        public static create(properties?: api.IRecv): api.Recv;

        /**
         * Encodes the specified Recv message. Does not implicitly {@link api.Recv.verify|verify} messages.
         * @param message Recv message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IRecv, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Recv message, length delimited. Does not implicitly {@link api.Recv.verify|verify} messages.
         * @param message Recv message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IRecv, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Recv message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Recv
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.Recv;

        /**
         * Decodes a Recv message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Recv
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.Recv;

        /**
         * Verifies a Recv message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Recv message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Recv
         */
        public static fromObject(object: { [k: string]: any }): api.Recv;

        /**
         * Creates a plain object from a Recv message. Also converts values to other types if specified.
         * @param message Recv
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.Recv, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Recv to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Connect. */
    interface IConnect {

        /** Connect proto */
        proto?: (string|null);

        /** Connect addr */
        addr?: (string|null);
    }

    /** Represents a Connect. */
    class Connect implements IConnect {

        /**
         * Constructs a new Connect.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IConnect);

        /** Connect proto. */
        public proto: string;

        /** Connect addr. */
        public addr: string;

        /**
         * Creates a new Connect instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Connect instance
         */
        public static create(properties?: api.IConnect): api.Connect;

        /**
         * Encodes the specified Connect message. Does not implicitly {@link api.Connect.verify|verify} messages.
         * @param message Connect message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IConnect, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Connect message, length delimited. Does not implicitly {@link api.Connect.verify|verify} messages.
         * @param message Connect message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IConnect, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Connect message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Connect
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.Connect;

        /**
         * Decodes a Connect message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Connect
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.Connect;

        /**
         * Verifies a Connect message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Connect message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Connect
         */
        public static fromObject(object: { [k: string]: any }): api.Connect;

        /**
         * Creates a plain object from a Connect message. Also converts values to other types if specified.
         * @param message Connect
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.Connect, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Connect to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Hint. */
    interface IHint {

        /** Hint text */
        text?: (string|null);
    }

    /** Represents a Hint. */
    class Hint implements IHint {

        /**
         * Constructs a new Hint.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IHint);

        /** Hint text. */
        public text: string;

        /**
         * Creates a new Hint instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Hint instance
         */
        public static create(properties?: api.IHint): api.Hint;

        /**
         * Encodes the specified Hint message. Does not implicitly {@link api.Hint.verify|verify} messages.
         * @param message Hint message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IHint, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Hint message, length delimited. Does not implicitly {@link api.Hint.verify|verify} messages.
         * @param message Hint message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IHint, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Hint message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Hint
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.Hint;

        /**
         * Decodes a Hint message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Hint
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.Hint;

        /**
         * Verifies a Hint message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Hint message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Hint
         */
        public static fromObject(object: { [k: string]: any }): api.Hint;

        /**
         * Creates a plain object from a Hint message. Also converts values to other types if specified.
         * @param message Hint
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.Hint, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Hint to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Ping. */
    interface IPing {
    }

    /** Represents a Ping. */
    class Ping implements IPing {

        /**
         * Constructs a new Ping.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IPing);

        /**
         * Creates a new Ping instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Ping instance
         */
        public static create(properties?: api.IPing): api.Ping;

        /**
         * Encodes the specified Ping message. Does not implicitly {@link api.Ping.verify|verify} messages.
         * @param message Ping message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IPing, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Ping message, length delimited. Does not implicitly {@link api.Ping.verify|verify} messages.
         * @param message Ping message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IPing, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Ping message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Ping
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.Ping;

        /**
         * Decodes a Ping message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Ping
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.Ping;

        /**
         * Verifies a Ping message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Ping message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Ping
         */
        public static fromObject(object: { [k: string]: any }): api.Ping;

        /**
         * Creates a plain object from a Ping message. Also converts values to other types if specified.
         * @param message Ping
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.Ping, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Ping to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Pong. */
    interface IPong {
    }

    /** Represents a Pong. */
    class Pong implements IPong {

        /**
         * Constructs a new Pong.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IPong);

        /**
         * Creates a new Pong instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Pong instance
         */
        public static create(properties?: api.IPong): api.Pong;

        /**
         * Encodes the specified Pong message. Does not implicitly {@link api.Pong.verify|verify} messages.
         * @param message Pong message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IPong, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Pong message, length delimited. Does not implicitly {@link api.Pong.verify|verify} messages.
         * @param message Pong message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IPong, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Pong message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Pong
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.Pong;

        /**
         * Decodes a Pong message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Pong
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.Pong;

        /**
         * Verifies a Pong message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Pong message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Pong
         */
        public static fromObject(object: { [k: string]: any }): api.Pong;

        /**
         * Creates a plain object from a Pong message. Also converts values to other types if specified.
         * @param message Pong
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.Pong, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Pong to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Hello. */
    interface IHello {

        /** Hello userid */
        userid?: (number|null);

        /** Hello username */
        username?: (string|null);

        /** Hello token */
        token?: (string|null);
    }

    /** Represents a Hello. */
    class Hello implements IHello {

        /**
         * Constructs a new Hello.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IHello);

        /** Hello userid. */
        public userid: number;

        /** Hello username. */
        public username: string;

        /** Hello token. */
        public token: string;

        /**
         * Creates a new Hello instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Hello instance
         */
        public static create(properties?: api.IHello): api.Hello;

        /**
         * Encodes the specified Hello message. Does not implicitly {@link api.Hello.verify|verify} messages.
         * @param message Hello message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IHello, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Hello message, length delimited. Does not implicitly {@link api.Hello.verify|verify} messages.
         * @param message Hello message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IHello, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Hello message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Hello
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.Hello;

        /**
         * Decodes a Hello message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Hello
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.Hello;

        /**
         * Verifies a Hello message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Hello message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Hello
         */
        public static fromObject(object: { [k: string]: any }): api.Hello;

        /**
         * Creates a plain object from a Hello message. Also converts values to other types if specified.
         * @param message Hello
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.Hello, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Hello to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Goodbye. */
    interface IGoodbye {
    }

    /** Represents a Goodbye. */
    class Goodbye implements IGoodbye {

        /**
         * Constructs a new Goodbye.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IGoodbye);

        /**
         * Creates a new Goodbye instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Goodbye instance
         */
        public static create(properties?: api.IGoodbye): api.Goodbye;

        /**
         * Encodes the specified Goodbye message. Does not implicitly {@link api.Goodbye.verify|verify} messages.
         * @param message Goodbye message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IGoodbye, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Goodbye message, length delimited. Does not implicitly {@link api.Goodbye.verify|verify} messages.
         * @param message Goodbye message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IGoodbye, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Goodbye message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Goodbye
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.Goodbye;

        /**
         * Decodes a Goodbye message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Goodbye
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.Goodbye;

        /**
         * Verifies a Goodbye message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Goodbye message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Goodbye
         */
        public static fromObject(object: { [k: string]: any }): api.Goodbye;

        /**
         * Creates a plain object from a Goodbye message. Also converts values to other types if specified.
         * @param message Goodbye
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.Goodbye, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Goodbye to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** State enum. */
    enum State {
        Stopped = 0,
        Running = 1
    }

    /** Properties of a CheckChanges. */
    interface ICheckChanges {
    }

    /** Represents a CheckChanges. */
    class CheckChanges implements ICheckChanges {

        /**
         * Constructs a new CheckChanges.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.ICheckChanges);

        /**
         * Creates a new CheckChanges instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CheckChanges instance
         */
        public static create(properties?: api.ICheckChanges): api.CheckChanges;

        /**
         * Encodes the specified CheckChanges message. Does not implicitly {@link api.CheckChanges.verify|verify} messages.
         * @param message CheckChanges message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.ICheckChanges, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CheckChanges message, length delimited. Does not implicitly {@link api.CheckChanges.verify|verify} messages.
         * @param message CheckChanges message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.ICheckChanges, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CheckChanges message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CheckChanges
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.CheckChanges;

        /**
         * Decodes a CheckChanges message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CheckChanges
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.CheckChanges;

        /**
         * Verifies a CheckChanges message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CheckChanges message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CheckChanges
         */
        public static fromObject(object: { [k: string]: any }): api.CheckChanges;

        /**
         * Creates a plain object from a CheckChanges message. Also converts values to other types if specified.
         * @param message CheckChanges
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.CheckChanges, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CheckChanges to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an EnsurePackages. */
    interface IEnsurePackages {

        /** EnsurePackages install */
        install?: (boolean|null);

        /** EnsurePackages file */
        file?: (api.IFile|null);
    }

    /** Represents an EnsurePackages. */
    class EnsurePackages implements IEnsurePackages {

        /**
         * Constructs a new EnsurePackages.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IEnsurePackages);

        /** EnsurePackages install. */
        public install: boolean;

        /** EnsurePackages file. */
        public file?: (api.IFile|null);

        /**
         * Creates a new EnsurePackages instance using the specified properties.
         * @param [properties] Properties to set
         * @returns EnsurePackages instance
         */
        public static create(properties?: api.IEnsurePackages): api.EnsurePackages;

        /**
         * Encodes the specified EnsurePackages message. Does not implicitly {@link api.EnsurePackages.verify|verify} messages.
         * @param message EnsurePackages message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IEnsurePackages, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified EnsurePackages message, length delimited. Does not implicitly {@link api.EnsurePackages.verify|verify} messages.
         * @param message EnsurePackages message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IEnsurePackages, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an EnsurePackages message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns EnsurePackages
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.EnsurePackages;

        /**
         * Decodes an EnsurePackages message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns EnsurePackages
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.EnsurePackages;

        /**
         * Verifies an EnsurePackages message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an EnsurePackages message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns EnsurePackages
         */
        public static fromObject(object: { [k: string]: any }): api.EnsurePackages;

        /**
         * Creates a plain object from an EnsurePackages message. Also converts values to other types if specified.
         * @param message EnsurePackages
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.EnsurePackages, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this EnsurePackages to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Start. */
    interface IStart {
    }

    /** Represents a Start. */
    class Start implements IStart {

        /**
         * Constructs a new Start.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IStart);

        /**
         * Creates a new Start instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Start instance
         */
        public static create(properties?: api.IStart): api.Start;

        /**
         * Encodes the specified Start message. Does not implicitly {@link api.Start.verify|verify} messages.
         * @param message Start message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IStart, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Start message, length delimited. Does not implicitly {@link api.Start.verify|verify} messages.
         * @param message Start message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IStart, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Start message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Start
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.Start;

        /**
         * Decodes a Start message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Start
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.Start;

        /**
         * Verifies a Start message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Start message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Start
         */
        public static fromObject(object: { [k: string]: any }): api.Start;

        /**
         * Creates a plain object from a Start message. Also converts values to other types if specified.
         * @param message Start
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.Start, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Start to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a DebugStatus. */
    interface IDebugStatus {

        /** DebugStatus done */
        done?: (boolean|null);

        /** DebugStatus stack */
        stack?: (api.IStackFrame[]|null);
    }

    /** Represents a DebugStatus. */
    class DebugStatus implements IDebugStatus {

        /**
         * Constructs a new DebugStatus.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IDebugStatus);

        /** DebugStatus done. */
        public done: boolean;

        /** DebugStatus stack. */
        public stack: api.IStackFrame[];

        /**
         * Creates a new DebugStatus instance using the specified properties.
         * @param [properties] Properties to set
         * @returns DebugStatus instance
         */
        public static create(properties?: api.IDebugStatus): api.DebugStatus;

        /**
         * Encodes the specified DebugStatus message. Does not implicitly {@link api.DebugStatus.verify|verify} messages.
         * @param message DebugStatus message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IDebugStatus, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified DebugStatus message, length delimited. Does not implicitly {@link api.DebugStatus.verify|verify} messages.
         * @param message DebugStatus message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IDebugStatus, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a DebugStatus message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns DebugStatus
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.DebugStatus;

        /**
         * Decodes a DebugStatus message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns DebugStatus
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.DebugStatus;

        /**
         * Verifies a DebugStatus message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a DebugStatus message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns DebugStatus
         */
        public static fromObject(object: { [k: string]: any }): api.DebugStatus;

        /**
         * Creates a plain object from a DebugStatus message. Also converts values to other types if specified.
         * @param message DebugStatus
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.DebugStatus, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this DebugStatus to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a StackFrame. */
    interface IStackFrame {

        /** StackFrame function */
        "function"?: (string|null);

        /** StackFrame line */
        line?: (number|null);
    }

    /** Represents a StackFrame. */
    class StackFrame implements IStackFrame {

        /**
         * Constructs a new StackFrame.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IStackFrame);

        /** StackFrame function. */
        public function: string;

        /** StackFrame line. */
        public line: number;

        /**
         * Creates a new StackFrame instance using the specified properties.
         * @param [properties] Properties to set
         * @returns StackFrame instance
         */
        public static create(properties?: api.IStackFrame): api.StackFrame;

        /**
         * Encodes the specified StackFrame message. Does not implicitly {@link api.StackFrame.verify|verify} messages.
         * @param message StackFrame message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IStackFrame, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified StackFrame message, length delimited. Does not implicitly {@link api.StackFrame.verify|verify} messages.
         * @param message StackFrame message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IStackFrame, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a StackFrame message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns StackFrame
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.StackFrame;

        /**
         * Decodes a StackFrame message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns StackFrame
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.StackFrame;

        /**
         * Verifies a StackFrame message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a StackFrame message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns StackFrame
         */
        public static fromObject(object: { [k: string]: any }): api.StackFrame;

        /**
         * Creates a plain object from a StackFrame message. Also converts values to other types if specified.
         * @param message StackFrame
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.StackFrame, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this StackFrame to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ContainedTest. */
    interface IContainedTest {

        /** ContainedTest suite */
        suite?: (api.IFile|null);

        /** ContainedTest project */
        project?: (api.IFile[]|null);
    }

    /** Represents a ContainedTest. */
    class ContainedTest implements IContainedTest {

        /**
         * Constructs a new ContainedTest.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IContainedTest);

        /** ContainedTest suite. */
        public suite?: (api.IFile|null);

        /** ContainedTest project. */
        public project: api.IFile[];

        /**
         * Creates a new ContainedTest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ContainedTest instance
         */
        public static create(properties?: api.IContainedTest): api.ContainedTest;

        /**
         * Encodes the specified ContainedTest message. Does not implicitly {@link api.ContainedTest.verify|verify} messages.
         * @param message ContainedTest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IContainedTest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ContainedTest message, length delimited. Does not implicitly {@link api.ContainedTest.verify|verify} messages.
         * @param message ContainedTest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IContainedTest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ContainedTest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ContainedTest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.ContainedTest;

        /**
         * Decodes a ContainedTest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ContainedTest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.ContainedTest;

        /**
         * Verifies a ContainedTest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ContainedTest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ContainedTest
         */
        public static fromObject(object: { [k: string]: any }): api.ContainedTest;

        /**
         * Creates a plain object from a ContainedTest message. Also converts values to other types if specified.
         * @param message ContainedTest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.ContainedTest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ContainedTest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a TestResult. */
    interface ITestResult {

        /** TestResult passed */
        passed?: (boolean|null);

        /** TestResult stderr */
        stderr?: (string|null);

        /** TestResult fails */
        fails?: (api.ITestFailure[]|null);
    }

    /** Represents a TestResult. */
    class TestResult implements ITestResult {

        /**
         * Constructs a new TestResult.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.ITestResult);

        /** TestResult passed. */
        public passed: boolean;

        /** TestResult stderr. */
        public stderr: string;

        /** TestResult fails. */
        public fails: api.ITestFailure[];

        /**
         * Creates a new TestResult instance using the specified properties.
         * @param [properties] Properties to set
         * @returns TestResult instance
         */
        public static create(properties?: api.ITestResult): api.TestResult;

        /**
         * Encodes the specified TestResult message. Does not implicitly {@link api.TestResult.verify|verify} messages.
         * @param message TestResult message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.ITestResult, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified TestResult message, length delimited. Does not implicitly {@link api.TestResult.verify|verify} messages.
         * @param message TestResult message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.ITestResult, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a TestResult message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TestResult
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.TestResult;

        /**
         * Decodes a TestResult message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns TestResult
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.TestResult;

        /**
         * Verifies a TestResult message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a TestResult message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns TestResult
         */
        public static fromObject(object: { [k: string]: any }): api.TestResult;

        /**
         * Creates a plain object from a TestResult message. Also converts values to other types if specified.
         * @param message TestResult
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.TestResult, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this TestResult to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a TestFailure. */
    interface ITestFailure {

        /** TestFailure name */
        name?: (string|null);

        /** TestFailure trace */
        trace?: (string|null);
    }

    /** Represents a TestFailure. */
    class TestFailure implements ITestFailure {

        /**
         * Constructs a new TestFailure.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.ITestFailure);

        /** TestFailure name. */
        public name: string;

        /** TestFailure trace. */
        public trace: string;

        /**
         * Creates a new TestFailure instance using the specified properties.
         * @param [properties] Properties to set
         * @returns TestFailure instance
         */
        public static create(properties?: api.ITestFailure): api.TestFailure;

        /**
         * Encodes the specified TestFailure message. Does not implicitly {@link api.TestFailure.verify|verify} messages.
         * @param message TestFailure message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.ITestFailure, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified TestFailure message, length delimited. Does not implicitly {@link api.TestFailure.verify|verify} messages.
         * @param message TestFailure message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.ITestFailure, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a TestFailure message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TestFailure
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.TestFailure;

        /**
         * Decodes a TestFailure message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns TestFailure
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.TestFailure;

        /**
         * Verifies a TestFailure message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a TestFailure message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns TestFailure
         */
        public static fromObject(object: { [k: string]: any }): api.TestFailure;

        /**
         * Creates a plain object from a TestFailure message. Also converts values to other types if specified.
         * @param message TestFailure
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.TestFailure, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this TestFailure to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ResizeTerm. */
    interface IResizeTerm {

        /** ResizeTerm rows */
        rows?: (number|null);

        /** ResizeTerm cols */
        cols?: (number|null);
    }

    /** Represents a ResizeTerm. */
    class ResizeTerm implements IResizeTerm {

        /**
         * Constructs a new ResizeTerm.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IResizeTerm);

        /** ResizeTerm rows. */
        public rows: number;

        /** ResizeTerm cols. */
        public cols: number;

        /**
         * Creates a new ResizeTerm instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ResizeTerm instance
         */
        public static create(properties?: api.IResizeTerm): api.ResizeTerm;

        /**
         * Encodes the specified ResizeTerm message. Does not implicitly {@link api.ResizeTerm.verify|verify} messages.
         * @param message ResizeTerm message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IResizeTerm, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ResizeTerm message, length delimited. Does not implicitly {@link api.ResizeTerm.verify|verify} messages.
         * @param message ResizeTerm message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IResizeTerm, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ResizeTerm message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ResizeTerm
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.ResizeTerm;

        /**
         * Decodes a ResizeTerm message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ResizeTerm
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.ResizeTerm;

        /**
         * Verifies a ResizeTerm message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ResizeTerm message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ResizeTerm
         */
        public static fromObject(object: { [k: string]: any }): api.ResizeTerm;

        /**
         * Creates a plain object from a ResizeTerm message. Also converts values to other types if specified.
         * @param message ResizeTerm
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.ResizeTerm, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ResizeTerm to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a SaneTerm. */
    interface ISaneTerm {
    }

    /** Represents a SaneTerm. */
    class SaneTerm implements ISaneTerm {

        /**
         * Constructs a new SaneTerm.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.ISaneTerm);

        /**
         * Creates a new SaneTerm instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SaneTerm instance
         */
        public static create(properties?: api.ISaneTerm): api.SaneTerm;

        /**
         * Encodes the specified SaneTerm message. Does not implicitly {@link api.SaneTerm.verify|verify} messages.
         * @param message SaneTerm message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.ISaneTerm, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SaneTerm message, length delimited. Does not implicitly {@link api.SaneTerm.verify|verify} messages.
         * @param message SaneTerm message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.ISaneTerm, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SaneTerm message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SaneTerm
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.SaneTerm;

        /**
         * Decodes a SaneTerm message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SaneTerm
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.SaneTerm;

        /**
         * Verifies a SaneTerm message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SaneTerm message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SaneTerm
         */
        public static fromObject(object: { [k: string]: any }): api.SaneTerm;

        /**
         * Creates a plain object from a SaneTerm message. Also converts values to other types if specified.
         * @param message SaneTerm
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.SaneTerm, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SaneTerm to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a LintResults. */
    interface ILintResults {

        /** LintResults results */
        results?: (api.ILintResult[]|null);
    }

    /** Represents a LintResults. */
    class LintResults implements ILintResults {

        /**
         * Constructs a new LintResults.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.ILintResults);

        /** LintResults results. */
        public results: api.ILintResult[];

        /**
         * Creates a new LintResults instance using the specified properties.
         * @param [properties] Properties to set
         * @returns LintResults instance
         */
        public static create(properties?: api.ILintResults): api.LintResults;

        /**
         * Encodes the specified LintResults message. Does not implicitly {@link api.LintResults.verify|verify} messages.
         * @param message LintResults message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.ILintResults, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified LintResults message, length delimited. Does not implicitly {@link api.LintResults.verify|verify} messages.
         * @param message LintResults message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.ILintResults, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a LintResults message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns LintResults
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.LintResults;

        /**
         * Decodes a LintResults message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns LintResults
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.LintResults;

        /**
         * Verifies a LintResults message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a LintResults message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns LintResults
         */
        public static fromObject(object: { [k: string]: any }): api.LintResults;

        /**
         * Creates a plain object from a LintResults message. Also converts values to other types if specified.
         * @param message LintResults
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.LintResults, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this LintResults to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a LintResult. */
    interface ILintResult {

        /** LintResult text */
        text?: (string|null);

        /** LintResult row */
        row?: (number|null);

        /** LintResult column */
        column?: (number|null);

        /** LintResult type */
        type?: (string|null);
    }

    /** Represents a LintResult. */
    class LintResult implements ILintResult {

        /**
         * Constructs a new LintResult.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.ILintResult);

        /** LintResult text. */
        public text: string;

        /** LintResult row. */
        public row: number;

        /** LintResult column. */
        public column: number;

        /** LintResult type. */
        public type: string;

        /**
         * Creates a new LintResult instance using the specified properties.
         * @param [properties] Properties to set
         * @returns LintResult instance
         */
        public static create(properties?: api.ILintResult): api.LintResult;

        /**
         * Encodes the specified LintResult message. Does not implicitly {@link api.LintResult.verify|verify} messages.
         * @param message LintResult message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.ILintResult, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified LintResult message, length delimited. Does not implicitly {@link api.LintResult.verify|verify} messages.
         * @param message LintResult message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.ILintResult, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a LintResult message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns LintResult
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.LintResult;

        /**
         * Decodes a LintResult message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns LintResult
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.LintResult;

        /**
         * Verifies a LintResult message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a LintResult message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns LintResult
         */
        public static fromObject(object: { [k: string]: any }): api.LintResult;

        /**
         * Creates a plain object from a LintResult message. Also converts values to other types if specified.
         * @param message LintResult
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.LintResult, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this LintResult to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a OK. */
    interface IOK {
    }

    /** Represents a OK. */
    class OK implements IOK {

        /**
         * Constructs a new OK.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IOK);

        /**
         * Creates a new OK instance using the specified properties.
         * @param [properties] Properties to set
         * @returns OK instance
         */
        public static create(properties?: api.IOK): api.OK;

        /**
         * Encodes the specified OK message. Does not implicitly {@link api.OK.verify|verify} messages.
         * @param message OK message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IOK, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified OK message, length delimited. Does not implicitly {@link api.OK.verify|verify} messages.
         * @param message OK message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IOK, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a OK message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns OK
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.OK;

        /**
         * Decodes a OK message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns OK
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.OK;

        /**
         * Verifies a OK message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a OK message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns OK
         */
        public static fromObject(object: { [k: string]: any }): api.OK;

        /**
         * Creates a plain object from a OK message. Also converts values to other types if specified.
         * @param message OK
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.OK, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this OK to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Move. */
    interface IMove {

        /** Move oldPath */
        oldPath?: (string|null);

        /** Move newPath */
        newPath?: (string|null);
    }

    /** Represents a Move. */
    class Move implements IMove {

        /**
         * Constructs a new Move.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IMove);

        /** Move oldPath. */
        public oldPath: string;

        /** Move newPath. */
        public newPath: string;

        /**
         * Creates a new Move instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Move instance
         */
        public static create(properties?: api.IMove): api.Move;

        /**
         * Encodes the specified Move message. Does not implicitly {@link api.Move.verify|verify} messages.
         * @param message Move message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IMove, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Move message, length delimited. Does not implicitly {@link api.Move.verify|verify} messages.
         * @param message Move message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IMove, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Move message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Move
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.Move;

        /**
         * Decodes a Move message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Move
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.Move;

        /**
         * Verifies a Move message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Move message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Move
         */
        public static fromObject(object: { [k: string]: any }): api.Move;

        /**
         * Creates a plain object from a Move message. Also converts values to other types if specified.
         * @param message Move
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.Move, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Move to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Files. */
    interface IFiles {

        /** Files files */
        files?: (api.IFile[]|null);
    }

    /** Represents a Files. */
    class Files implements IFiles {

        /**
         * Constructs a new Files.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IFiles);

        /** Files files. */
        public files: api.IFile[];

        /**
         * Creates a new Files instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Files instance
         */
        public static create(properties?: api.IFiles): api.Files;

        /**
         * Encodes the specified Files message. Does not implicitly {@link api.Files.verify|verify} messages.
         * @param message Files message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IFiles, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Files message, length delimited. Does not implicitly {@link api.Files.verify|verify} messages.
         * @param message Files message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IFiles, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Files message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Files
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.Files;

        /**
         * Decodes a Files message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Files
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.Files;

        /**
         * Verifies a Files message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Files message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Files
         */
        public static fromObject(object: { [k: string]: any }): api.Files;

        /**
         * Creates a plain object from a Files message. Also converts values to other types if specified.
         * @param message Files
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.Files, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Files to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a File. */
    interface IFile {

        /** File path */
        path?: (string|null);

        /** File type */
        type?: (api.File.Type|null);

        /** File content */
        content?: (Uint8Array|null);
    }

    /** Represents a File. */
    class File implements IFile {

        /**
         * Constructs a new File.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IFile);

        /** File path. */
        public path: string;

        /** File type. */
        public type: api.File.Type;

        /** File content. */
        public content: Uint8Array;

        /**
         * Creates a new File instance using the specified properties.
         * @param [properties] Properties to set
         * @returns File instance
         */
        public static create(properties?: api.IFile): api.File;

        /**
         * Encodes the specified File message. Does not implicitly {@link api.File.verify|verify} messages.
         * @param message File message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IFile, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified File message, length delimited. Does not implicitly {@link api.File.verify|verify} messages.
         * @param message File message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IFile, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a File message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns File
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.File;

        /**
         * Decodes a File message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns File
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.File;

        /**
         * Verifies a File message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a File message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns File
         */
        public static fromObject(object: { [k: string]: any }): api.File;

        /**
         * Creates a plain object from a File message. Also converts values to other types if specified.
         * @param message File
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.File, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this File to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    namespace File {

        /** Type enum. */
        enum Type {
            REGULAR = 0,
            DIRECTORY = 1
        }
    }

    /** Properties of a Clear. */
    interface IClear {
    }

    /** Represents a Clear. */
    class Clear implements IClear {

        /**
         * Constructs a new Clear.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IClear);

        /**
         * Creates a new Clear instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Clear instance
         */
        public static create(properties?: api.IClear): api.Clear;

        /**
         * Encodes the specified Clear message. Does not implicitly {@link api.Clear.verify|verify} messages.
         * @param message Clear message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IClear, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Clear message, length delimited. Does not implicitly {@link api.Clear.verify|verify} messages.
         * @param message Clear message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IClear, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Clear message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Clear
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.Clear;

        /**
         * Decodes a Clear message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Clear
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.Clear;

        /**
         * Verifies a Clear message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Clear message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Clear
         */
        public static fromObject(object: { [k: string]: any }): api.Clear;

        /**
         * Creates a plain object from a Clear message. Also converts values to other types if specified.
         * @param message Clear
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.Clear, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Clear to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Toast. */
    interface IToast {

        /** Toast text */
        text?: (string|null);
    }

    /** Represents a Toast. */
    class Toast implements IToast {

        /**
         * Constructs a new Toast.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IToast);

        /** Toast text. */
        public text: string;

        /**
         * Creates a new Toast instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Toast instance
         */
        public static create(properties?: api.IToast): api.Toast;

        /**
         * Encodes the specified Toast message. Does not implicitly {@link api.Toast.verify|verify} messages.
         * @param message Toast message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IToast, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Toast message, length delimited. Does not implicitly {@link api.Toast.verify|verify} messages.
         * @param message Toast message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IToast, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Toast message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Toast
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.Toast;

        /**
         * Decodes a Toast message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Toast
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.Toast;

        /**
         * Verifies a Toast message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Toast message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Toast
         */
        public static fromObject(object: { [k: string]: any }): api.Toast;

        /**
         * Creates a plain object from a Toast message. Also converts values to other types if specified.
         * @param message Toast
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.Toast, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Toast to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RunMain. */
    interface IRunMain {
    }

    /** Represents a RunMain. */
    class RunMain implements IRunMain {

        /**
         * Constructs a new RunMain.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IRunMain);

        /**
         * Creates a new RunMain instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RunMain instance
         */
        public static create(properties?: api.IRunMain): api.RunMain;

        /**
         * Encodes the specified RunMain message. Does not implicitly {@link api.RunMain.verify|verify} messages.
         * @param message RunMain message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IRunMain, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RunMain message, length delimited. Does not implicitly {@link api.RunMain.verify|verify} messages.
         * @param message RunMain message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IRunMain, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RunMain message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RunMain
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.RunMain;

        /**
         * Decodes a RunMain message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RunMain
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.RunMain;

        /**
         * Verifies a RunMain message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RunMain message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RunMain
         */
        public static fromObject(object: { [k: string]: any }): api.RunMain;

        /**
         * Creates a plain object from a RunMain message. Also converts values to other types if specified.
         * @param message RunMain
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.RunMain, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RunMain to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an OpenChannel. */
    interface IOpenChannel {

        /** OpenChannel service */
        service?: (string|null);

        /** OpenChannel name */
        name?: (string|null);

        /** OpenChannel action */
        action?: (api.OpenChannel.Action|null);
    }

    /** Represents an OpenChannel. */
    class OpenChannel implements IOpenChannel {

        /**
         * Constructs a new OpenChannel.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IOpenChannel);

        /** OpenChannel service. */
        public service: string;

        /** OpenChannel name. */
        public name: string;

        /** OpenChannel action. */
        public action: api.OpenChannel.Action;

        /**
         * Creates a new OpenChannel instance using the specified properties.
         * @param [properties] Properties to set
         * @returns OpenChannel instance
         */
        public static create(properties?: api.IOpenChannel): api.OpenChannel;

        /**
         * Encodes the specified OpenChannel message. Does not implicitly {@link api.OpenChannel.verify|verify} messages.
         * @param message OpenChannel message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IOpenChannel, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified OpenChannel message, length delimited. Does not implicitly {@link api.OpenChannel.verify|verify} messages.
         * @param message OpenChannel message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IOpenChannel, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an OpenChannel message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns OpenChannel
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.OpenChannel;

        /**
         * Decodes an OpenChannel message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns OpenChannel
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.OpenChannel;

        /**
         * Verifies an OpenChannel message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an OpenChannel message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns OpenChannel
         */
        public static fromObject(object: { [k: string]: any }): api.OpenChannel;

        /**
         * Creates a plain object from an OpenChannel message. Also converts values to other types if specified.
         * @param message OpenChannel
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.OpenChannel, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this OpenChannel to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    namespace OpenChannel {

        /** Action enum. */
        enum Action {
            CREATE = 0,
            ATTACH = 1,
            ATTACH_OR_CREATE = 2
        }
    }

    /** Properties of an OpenChannelRes. */
    interface IOpenChannelRes {

        /** OpenChannelRes id */
        id?: (number|null);

        /** OpenChannelRes state */
        state?: (api.OpenChannelRes.State|null);

        /** OpenChannelRes error */
        error?: (string|null);
    }

    /** Represents an OpenChannelRes. */
    class OpenChannelRes implements IOpenChannelRes {

        /**
         * Constructs a new OpenChannelRes.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IOpenChannelRes);

        /** OpenChannelRes id. */
        public id: number;

        /** OpenChannelRes state. */
        public state: api.OpenChannelRes.State;

        /** OpenChannelRes error. */
        public error: string;

        /**
         * Creates a new OpenChannelRes instance using the specified properties.
         * @param [properties] Properties to set
         * @returns OpenChannelRes instance
         */
        public static create(properties?: api.IOpenChannelRes): api.OpenChannelRes;

        /**
         * Encodes the specified OpenChannelRes message. Does not implicitly {@link api.OpenChannelRes.verify|verify} messages.
         * @param message OpenChannelRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IOpenChannelRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified OpenChannelRes message, length delimited. Does not implicitly {@link api.OpenChannelRes.verify|verify} messages.
         * @param message OpenChannelRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IOpenChannelRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an OpenChannelRes message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns OpenChannelRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.OpenChannelRes;

        /**
         * Decodes an OpenChannelRes message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns OpenChannelRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.OpenChannelRes;

        /**
         * Verifies an OpenChannelRes message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an OpenChannelRes message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns OpenChannelRes
         */
        public static fromObject(object: { [k: string]: any }): api.OpenChannelRes;

        /**
         * Creates a plain object from an OpenChannelRes message. Also converts values to other types if specified.
         * @param message OpenChannelRes
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.OpenChannelRes, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this OpenChannelRes to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    namespace OpenChannelRes {

        /** State enum. */
        enum State {
            CREATED = 0,
            ATTACHED = 1,
            ERROR = 2
        }
    }

    /** Properties of a CloseChannel. */
    interface ICloseChannel {

        /** CloseChannel id */
        id?: (number|null);
    }

    /** Represents a CloseChannel. */
    class CloseChannel implements ICloseChannel {

        /**
         * Constructs a new CloseChannel.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.ICloseChannel);

        /** CloseChannel id. */
        public id: number;

        /**
         * Creates a new CloseChannel instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CloseChannel instance
         */
        public static create(properties?: api.ICloseChannel): api.CloseChannel;

        /**
         * Encodes the specified CloseChannel message. Does not implicitly {@link api.CloseChannel.verify|verify} messages.
         * @param message CloseChannel message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.ICloseChannel, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CloseChannel message, length delimited. Does not implicitly {@link api.CloseChannel.verify|verify} messages.
         * @param message CloseChannel message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.ICloseChannel, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CloseChannel message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CloseChannel
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.CloseChannel;

        /**
         * Decodes a CloseChannel message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CloseChannel
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.CloseChannel;

        /**
         * Verifies a CloseChannel message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CloseChannel message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CloseChannel
         */
        public static fromObject(object: { [k: string]: any }): api.CloseChannel;

        /**
         * Creates a plain object from a CloseChannel message. Also converts values to other types if specified.
         * @param message CloseChannel
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.CloseChannel, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CloseChannel to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ContainerState. */
    interface IContainerState {

        /** ContainerState state */
        state?: (api.ContainerState.State|null);
    }

    /** Represents a ContainerState. */
    class ContainerState implements IContainerState {

        /**
         * Constructs a new ContainerState.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IContainerState);

        /** ContainerState state. */
        public state: api.ContainerState.State;

        /**
         * Creates a new ContainerState instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ContainerState instance
         */
        public static create(properties?: api.IContainerState): api.ContainerState;

        /**
         * Encodes the specified ContainerState message. Does not implicitly {@link api.ContainerState.verify|verify} messages.
         * @param message ContainerState message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IContainerState, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ContainerState message, length delimited. Does not implicitly {@link api.ContainerState.verify|verify} messages.
         * @param message ContainerState message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IContainerState, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ContainerState message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ContainerState
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.ContainerState;

        /**
         * Decodes a ContainerState message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ContainerState
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.ContainerState;

        /**
         * Verifies a ContainerState message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ContainerState message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ContainerState
         */
        public static fromObject(object: { [k: string]: any }): api.ContainerState;

        /**
         * Creates a plain object from a ContainerState message. Also converts values to other types if specified.
         * @param message ContainerState
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.ContainerState, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ContainerState to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    namespace ContainerState {

        /** State enum. */
        enum State {
            SLEEP = 0,
            READY = 1
        }
    }

    /** Properties of a PortOpen. */
    interface IPortOpen {

        /** PortOpen forwarded */
        forwarded?: (boolean|null);

        /** PortOpen port */
        port?: (number|null);

        /** PortOpen address */
        address?: (string|null);
    }

    /** Represents a PortOpen. */
    class PortOpen implements IPortOpen {

        /**
         * Constructs a new PortOpen.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IPortOpen);

        /** PortOpen forwarded. */
        public forwarded: boolean;

        /** PortOpen port. */
        public port: number;

        /** PortOpen address. */
        public address: string;

        /**
         * Creates a new PortOpen instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PortOpen instance
         */
        public static create(properties?: api.IPortOpen): api.PortOpen;

        /**
         * Encodes the specified PortOpen message. Does not implicitly {@link api.PortOpen.verify|verify} messages.
         * @param message PortOpen message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IPortOpen, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PortOpen message, length delimited. Does not implicitly {@link api.PortOpen.verify|verify} messages.
         * @param message PortOpen message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IPortOpen, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PortOpen message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PortOpen
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.PortOpen;

        /**
         * Decodes a PortOpen message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PortOpen
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.PortOpen;

        /**
         * Verifies a PortOpen message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PortOpen message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PortOpen
         */
        public static fromObject(object: { [k: string]: any }): api.PortOpen;

        /**
         * Creates a plain object from a PortOpen message. Also converts values to other types if specified.
         * @param message PortOpen
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.PortOpen, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PortOpen to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a OTPacket. */
    interface IOTPacket {

        /** OTPacket version */
        version?: (number|null);

        /** OTPacket ops */
        ops?: (api.IOTRuneTransformOp[]|null);

        /** OTPacket crc32 */
        crc32?: (number|null);
    }

    /** Represents a OTPacket. */
    class OTPacket implements IOTPacket {

        /**
         * Constructs a new OTPacket.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IOTPacket);

        /** OTPacket version. */
        public version: number;

        /** OTPacket ops. */
        public ops: api.IOTRuneTransformOp[];

        /** OTPacket crc32. */
        public crc32: number;

        /**
         * Creates a new OTPacket instance using the specified properties.
         * @param [properties] Properties to set
         * @returns OTPacket instance
         */
        public static create(properties?: api.IOTPacket): api.OTPacket;

        /**
         * Encodes the specified OTPacket message. Does not implicitly {@link api.OTPacket.verify|verify} messages.
         * @param message OTPacket message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IOTPacket, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified OTPacket message, length delimited. Does not implicitly {@link api.OTPacket.verify|verify} messages.
         * @param message OTPacket message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IOTPacket, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a OTPacket message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns OTPacket
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.OTPacket;

        /**
         * Decodes a OTPacket message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns OTPacket
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.OTPacket;

        /**
         * Verifies a OTPacket message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a OTPacket message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns OTPacket
         */
        public static fromObject(object: { [k: string]: any }): api.OTPacket;

        /**
         * Creates a plain object from a OTPacket message. Also converts values to other types if specified.
         * @param message OTPacket
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.OTPacket, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this OTPacket to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a OTRuneTransformOp. */
    interface IOTRuneTransformOp {

        /** OTRuneTransformOp skip */
        skip?: (number|null);

        /** OTRuneTransformOp delete */
        "delete"?: (number|null);

        /** OTRuneTransformOp insert */
        insert?: (string|null);
    }

    /** Represents a OTRuneTransformOp. */
    class OTRuneTransformOp implements IOTRuneTransformOp {

        /**
         * Constructs a new OTRuneTransformOp.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IOTRuneTransformOp);

        /** OTRuneTransformOp skip. */
        public skip: number;

        /** OTRuneTransformOp delete. */
        public delete: number;

        /** OTRuneTransformOp insert. */
        public insert: string;

        /** OTRuneTransformOp op. */
        public op?: ("skip"|"delete"|"insert");

        /**
         * Creates a new OTRuneTransformOp instance using the specified properties.
         * @param [properties] Properties to set
         * @returns OTRuneTransformOp instance
         */
        public static create(properties?: api.IOTRuneTransformOp): api.OTRuneTransformOp;

        /**
         * Encodes the specified OTRuneTransformOp message. Does not implicitly {@link api.OTRuneTransformOp.verify|verify} messages.
         * @param message OTRuneTransformOp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IOTRuneTransformOp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified OTRuneTransformOp message, length delimited. Does not implicitly {@link api.OTRuneTransformOp.verify|verify} messages.
         * @param message OTRuneTransformOp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IOTRuneTransformOp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a OTRuneTransformOp message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns OTRuneTransformOp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.OTRuneTransformOp;

        /**
         * Decodes a OTRuneTransformOp message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns OTRuneTransformOp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.OTRuneTransformOp;

        /**
         * Verifies a OTRuneTransformOp message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a OTRuneTransformOp message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns OTRuneTransformOp
         */
        public static fromObject(object: { [k: string]: any }): api.OTRuneTransformOp;

        /**
         * Creates a plain object from a OTRuneTransformOp message. Also converts values to other types if specified.
         * @param message OTRuneTransformOp
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.OTRuneTransformOp, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this OTRuneTransformOp to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a OTStatus. */
    interface IOTStatus {

        /** OTStatus contents */
        contents?: (string|null);

        /** OTStatus version */
        version?: (number|null);

        /** OTStatus linkedFile */
        linkedFile?: (api.IFile|null);

        /** OTStatus cursors */
        cursors?: (api.IOTCursor[]|null);
    }

    /** Represents a OTStatus. */
    class OTStatus implements IOTStatus {

        /**
         * Constructs a new OTStatus.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IOTStatus);

        /** OTStatus contents. */
        public contents: string;

        /** OTStatus version. */
        public version: number;

        /** OTStatus linkedFile. */
        public linkedFile?: (api.IFile|null);

        /** OTStatus cursors. */
        public cursors: api.IOTCursor[];

        /**
         * Creates a new OTStatus instance using the specified properties.
         * @param [properties] Properties to set
         * @returns OTStatus instance
         */
        public static create(properties?: api.IOTStatus): api.OTStatus;

        /**
         * Encodes the specified OTStatus message. Does not implicitly {@link api.OTStatus.verify|verify} messages.
         * @param message OTStatus message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IOTStatus, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified OTStatus message, length delimited. Does not implicitly {@link api.OTStatus.verify|verify} messages.
         * @param message OTStatus message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IOTStatus, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a OTStatus message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns OTStatus
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.OTStatus;

        /**
         * Decodes a OTStatus message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns OTStatus
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.OTStatus;

        /**
         * Verifies a OTStatus message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a OTStatus message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns OTStatus
         */
        public static fromObject(object: { [k: string]: any }): api.OTStatus;

        /**
         * Creates a plain object from a OTStatus message. Also converts values to other types if specified.
         * @param message OTStatus
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.OTStatus, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this OTStatus to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a OTCursor. */
    interface IOTCursor {

        /** OTCursor position */
        position?: (number|null);

        /** OTCursor selectionStart */
        selectionStart?: (number|null);

        /** OTCursor selectionEnd */
        selectionEnd?: (number|null);

        /** OTCursor user */
        user?: (api.IUser|null);

        /** OTCursor id */
        id?: (string|null);
    }

    /** Represents a OTCursor. */
    class OTCursor implements IOTCursor {

        /**
         * Constructs a new OTCursor.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IOTCursor);

        /** OTCursor position. */
        public position: number;

        /** OTCursor selectionStart. */
        public selectionStart: number;

        /** OTCursor selectionEnd. */
        public selectionEnd: number;

        /** OTCursor user. */
        public user?: (api.IUser|null);

        /** OTCursor id. */
        public id: string;

        /**
         * Creates a new OTCursor instance using the specified properties.
         * @param [properties] Properties to set
         * @returns OTCursor instance
         */
        public static create(properties?: api.IOTCursor): api.OTCursor;

        /**
         * Encodes the specified OTCursor message. Does not implicitly {@link api.OTCursor.verify|verify} messages.
         * @param message OTCursor message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IOTCursor, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified OTCursor message, length delimited. Does not implicitly {@link api.OTCursor.verify|verify} messages.
         * @param message OTCursor message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IOTCursor, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a OTCursor message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns OTCursor
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.OTCursor;

        /**
         * Decodes a OTCursor message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns OTCursor
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.OTCursor;

        /**
         * Verifies a OTCursor message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a OTCursor message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns OTCursor
         */
        public static fromObject(object: { [k: string]: any }): api.OTCursor;

        /**
         * Creates a plain object from a OTCursor message. Also converts values to other types if specified.
         * @param message OTCursor
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.OTCursor, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this OTCursor to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ChatMessage. */
    interface IChatMessage {

        /** ChatMessage username */
        username?: (string|null);

        /** ChatMessage text */
        text?: (string|null);
    }

    /** Represents a ChatMessage. */
    class ChatMessage implements IChatMessage {

        /**
         * Constructs a new ChatMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IChatMessage);

        /** ChatMessage username. */
        public username: string;

        /** ChatMessage text. */
        public text: string;

        /**
         * Creates a new ChatMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ChatMessage instance
         */
        public static create(properties?: api.IChatMessage): api.ChatMessage;

        /**
         * Encodes the specified ChatMessage message. Does not implicitly {@link api.ChatMessage.verify|verify} messages.
         * @param message ChatMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IChatMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ChatMessage message, length delimited. Does not implicitly {@link api.ChatMessage.verify|verify} messages.
         * @param message ChatMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IChatMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ChatMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ChatMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.ChatMessage;

        /**
         * Decodes a ChatMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ChatMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.ChatMessage;

        /**
         * Verifies a ChatMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ChatMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ChatMessage
         */
        public static fromObject(object: { [k: string]: any }): api.ChatMessage;

        /**
         * Creates a plain object from a ChatMessage message. Also converts values to other types if specified.
         * @param message ChatMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.ChatMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ChatMessage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ChatTyping. */
    interface IChatTyping {

        /** ChatTyping username */
        username?: (string|null);

        /** ChatTyping typing */
        typing?: (boolean|null);
    }

    /** Represents a ChatTyping. */
    class ChatTyping implements IChatTyping {

        /**
         * Constructs a new ChatTyping.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IChatTyping);

        /** ChatTyping username. */
        public username: string;

        /** ChatTyping typing. */
        public typing: boolean;

        /**
         * Creates a new ChatTyping instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ChatTyping instance
         */
        public static create(properties?: api.IChatTyping): api.ChatTyping;

        /**
         * Encodes the specified ChatTyping message. Does not implicitly {@link api.ChatTyping.verify|verify} messages.
         * @param message ChatTyping message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IChatTyping, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ChatTyping message, length delimited. Does not implicitly {@link api.ChatTyping.verify|verify} messages.
         * @param message ChatTyping message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IChatTyping, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ChatTyping message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ChatTyping
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.ChatTyping;

        /**
         * Decodes a ChatTyping message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ChatTyping
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.ChatTyping;

        /**
         * Verifies a ChatTyping message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ChatTyping message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ChatTyping
         */
        public static fromObject(object: { [k: string]: any }): api.ChatTyping;

        /**
         * Creates a plain object from a ChatTyping message. Also converts values to other types if specified.
         * @param message ChatTyping
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.ChatTyping, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ChatTyping to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a User. */
    interface IUser {

        /** User id */
        id?: (number|null);

        /** User name */
        name?: (string|null);

        /** User roles */
        roles?: (string[]|null);

        /** User session */
        session?: (number|null);
    }

    /** Represents a User. */
    class User implements IUser {

        /**
         * Constructs a new User.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IUser);

        /** User id. */
        public id: number;

        /** User name. */
        public name: string;

        /** User roles. */
        public roles: string[];

        /** User session. */
        public session: number;

        /**
         * Creates a new User instance using the specified properties.
         * @param [properties] Properties to set
         * @returns User instance
         */
        public static create(properties?: api.IUser): api.User;

        /**
         * Encodes the specified User message. Does not implicitly {@link api.User.verify|verify} messages.
         * @param message User message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IUser, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified User message, length delimited. Does not implicitly {@link api.User.verify|verify} messages.
         * @param message User message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IUser, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a User message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns User
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.User;

        /**
         * Decodes a User message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns User
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.User;

        /**
         * Verifies a User message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a User message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns User
         */
        public static fromObject(object: { [k: string]: any }): api.User;

        /**
         * Creates a plain object from a User message. Also converts values to other types if specified.
         * @param message User
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.User, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this User to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Roster. */
    interface IRoster {

        /** Roster user */
        user?: (api.IUser[]|null);
    }

    /** Represents a Roster. */
    class Roster implements IRoster {

        /**
         * Constructs a new Roster.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IRoster);

        /** Roster user. */
        public user: api.IUser[];

        /**
         * Creates a new Roster instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Roster instance
         */
        public static create(properties?: api.IRoster): api.Roster;

        /**
         * Encodes the specified Roster message. Does not implicitly {@link api.Roster.verify|verify} messages.
         * @param message Roster message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IRoster, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Roster message, length delimited. Does not implicitly {@link api.Roster.verify|verify} messages.
         * @param message Roster message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IRoster, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Roster message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Roster
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.Roster;

        /**
         * Decodes a Roster message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Roster
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.Roster;

        /**
         * Verifies a Roster message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Roster message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Roster
         */
        public static fromObject(object: { [k: string]: any }): api.Roster;

        /**
         * Creates a plain object from a Roster message. Also converts values to other types if specified.
         * @param message Roster
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.Roster, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Roster to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an Exec. */
    interface IExec {

        /** Exec args */
        args?: (string[]|null);

        /** Exec env */
        env?: ({ [k: string]: string }|null);
    }

    /** Represents an Exec. */
    class Exec implements IExec {

        /**
         * Constructs a new Exec.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IExec);

        /** Exec args. */
        public args: string[];

        /** Exec env. */
        public env: { [k: string]: string };

        /**
         * Creates a new Exec instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Exec instance
         */
        public static create(properties?: api.IExec): api.Exec;

        /**
         * Encodes the specified Exec message. Does not implicitly {@link api.Exec.verify|verify} messages.
         * @param message Exec message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IExec, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Exec message, length delimited. Does not implicitly {@link api.Exec.verify|verify} messages.
         * @param message Exec message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IExec, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an Exec message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Exec
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.Exec;

        /**
         * Decodes an Exec message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Exec
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.Exec;

        /**
         * Verifies an Exec message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an Exec message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Exec
         */
        public static fromObject(object: { [k: string]: any }): api.Exec;

        /**
         * Creates a plain object from an Exec message. Also converts values to other types if specified.
         * @param message Exec
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.Exec, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Exec to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Package. */
    interface IPackage {

        /** Package name */
        name?: (string|null);

        /** Package spec */
        spec?: (string|null);

        /** Package description */
        description?: (string|null);

        /** Package version */
        version?: (string|null);

        /** Package homepageURL */
        homepageURL?: (string|null);

        /** Package documentationURL */
        documentationURL?: (string|null);

        /** Package sourceCodeURL */
        sourceCodeURL?: (string|null);

        /** Package bugTrackerURL */
        bugTrackerURL?: (string|null);

        /** Package author */
        author?: (string|null);

        /** Package license */
        license?: (string|null);

        /** Package dependencies */
        dependencies?: (api.IPackage[]|null);
    }

    /** Represents a Package. */
    class Package implements IPackage {

        /**
         * Constructs a new Package.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IPackage);

        /** Package name. */
        public name: string;

        /** Package spec. */
        public spec: string;

        /** Package description. */
        public description: string;

        /** Package version. */
        public version: string;

        /** Package homepageURL. */
        public homepageURL: string;

        /** Package documentationURL. */
        public documentationURL: string;

        /** Package sourceCodeURL. */
        public sourceCodeURL: string;

        /** Package bugTrackerURL. */
        public bugTrackerURL: string;

        /** Package author. */
        public author: string;

        /** Package license. */
        public license: string;

        /** Package dependencies. */
        public dependencies: api.IPackage[];

        /**
         * Creates a new Package instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Package instance
         */
        public static create(properties?: api.IPackage): api.Package;

        /**
         * Encodes the specified Package message. Does not implicitly {@link api.Package.verify|verify} messages.
         * @param message Package message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IPackage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Package message, length delimited. Does not implicitly {@link api.Package.verify|verify} messages.
         * @param message Package message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IPackage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Package message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Package
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.Package;

        /**
         * Decodes a Package message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Package
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.Package;

        /**
         * Verifies a Package message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Package message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Package
         */
        public static fromObject(object: { [k: string]: any }): api.Package;

        /**
         * Creates a plain object from a Package message. Also converts values to other types if specified.
         * @param message Package
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.Package, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Package to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a PackageSearch. */
    interface IPackageSearch {

        /** PackageSearch query */
        query?: (string|null);
    }

    /** Represents a PackageSearch. */
    class PackageSearch implements IPackageSearch {

        /**
         * Constructs a new PackageSearch.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IPackageSearch);

        /** PackageSearch query. */
        public query: string;

        /**
         * Creates a new PackageSearch instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PackageSearch instance
         */
        public static create(properties?: api.IPackageSearch): api.PackageSearch;

        /**
         * Encodes the specified PackageSearch message. Does not implicitly {@link api.PackageSearch.verify|verify} messages.
         * @param message PackageSearch message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IPackageSearch, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PackageSearch message, length delimited. Does not implicitly {@link api.PackageSearch.verify|verify} messages.
         * @param message PackageSearch message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IPackageSearch, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PackageSearch message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PackageSearch
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.PackageSearch;

        /**
         * Decodes a PackageSearch message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PackageSearch
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.PackageSearch;

        /**
         * Verifies a PackageSearch message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PackageSearch message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PackageSearch
         */
        public static fromObject(object: { [k: string]: any }): api.PackageSearch;

        /**
         * Creates a plain object from a PackageSearch message. Also converts values to other types if specified.
         * @param message PackageSearch
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.PackageSearch, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PackageSearch to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a PackageSearchResp. */
    interface IPackageSearchResp {

        /** PackageSearchResp results */
        results?: (api.IPackage[]|null);
    }

    /** Represents a PackageSearchResp. */
    class PackageSearchResp implements IPackageSearchResp {

        /**
         * Constructs a new PackageSearchResp.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IPackageSearchResp);

        /** PackageSearchResp results. */
        public results: api.IPackage[];

        /**
         * Creates a new PackageSearchResp instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PackageSearchResp instance
         */
        public static create(properties?: api.IPackageSearchResp): api.PackageSearchResp;

        /**
         * Encodes the specified PackageSearchResp message. Does not implicitly {@link api.PackageSearchResp.verify|verify} messages.
         * @param message PackageSearchResp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IPackageSearchResp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PackageSearchResp message, length delimited. Does not implicitly {@link api.PackageSearchResp.verify|verify} messages.
         * @param message PackageSearchResp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IPackageSearchResp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PackageSearchResp message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PackageSearchResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.PackageSearchResp;

        /**
         * Decodes a PackageSearchResp message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PackageSearchResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.PackageSearchResp;

        /**
         * Verifies a PackageSearchResp message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PackageSearchResp message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PackageSearchResp
         */
        public static fromObject(object: { [k: string]: any }): api.PackageSearchResp;

        /**
         * Creates a plain object from a PackageSearchResp message. Also converts values to other types if specified.
         * @param message PackageSearchResp
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.PackageSearchResp, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PackageSearchResp to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a PackageInfo. */
    interface IPackageInfo {

        /** PackageInfo pkg */
        pkg?: (api.IPackage|null);
    }

    /** Represents a PackageInfo. */
    class PackageInfo implements IPackageInfo {

        /**
         * Constructs a new PackageInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IPackageInfo);

        /** PackageInfo pkg. */
        public pkg?: (api.IPackage|null);

        /**
         * Creates a new PackageInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PackageInfo instance
         */
        public static create(properties?: api.IPackageInfo): api.PackageInfo;

        /**
         * Encodes the specified PackageInfo message. Does not implicitly {@link api.PackageInfo.verify|verify} messages.
         * @param message PackageInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IPackageInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PackageInfo message, length delimited. Does not implicitly {@link api.PackageInfo.verify|verify} messages.
         * @param message PackageInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IPackageInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PackageInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PackageInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.PackageInfo;

        /**
         * Decodes a PackageInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PackageInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.PackageInfo;

        /**
         * Verifies a PackageInfo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PackageInfo message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PackageInfo
         */
        public static fromObject(object: { [k: string]: any }): api.PackageInfo;

        /**
         * Creates a plain object from a PackageInfo message. Also converts values to other types if specified.
         * @param message PackageInfo
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.PackageInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PackageInfo to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a PackageInfoResp. */
    interface IPackageInfoResp {

        /** PackageInfoResp pkg */
        pkg?: (api.IPackage|null);
    }

    /** Represents a PackageInfoResp. */
    class PackageInfoResp implements IPackageInfoResp {

        /**
         * Constructs a new PackageInfoResp.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IPackageInfoResp);

        /** PackageInfoResp pkg. */
        public pkg?: (api.IPackage|null);

        /**
         * Creates a new PackageInfoResp instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PackageInfoResp instance
         */
        public static create(properties?: api.IPackageInfoResp): api.PackageInfoResp;

        /**
         * Encodes the specified PackageInfoResp message. Does not implicitly {@link api.PackageInfoResp.verify|verify} messages.
         * @param message PackageInfoResp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IPackageInfoResp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PackageInfoResp message, length delimited. Does not implicitly {@link api.PackageInfoResp.verify|verify} messages.
         * @param message PackageInfoResp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IPackageInfoResp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PackageInfoResp message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PackageInfoResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.PackageInfoResp;

        /**
         * Decodes a PackageInfoResp message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PackageInfoResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.PackageInfoResp;

        /**
         * Verifies a PackageInfoResp message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PackageInfoResp message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PackageInfoResp
         */
        public static fromObject(object: { [k: string]: any }): api.PackageInfoResp;

        /**
         * Creates a plain object from a PackageInfoResp message. Also converts values to other types if specified.
         * @param message PackageInfoResp
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.PackageInfoResp, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PackageInfoResp to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a PackageAdd. */
    interface IPackageAdd {

        /** PackageAdd pkgs */
        pkgs?: (api.IPackage[]|null);
    }

    /** Represents a PackageAdd. */
    class PackageAdd implements IPackageAdd {

        /**
         * Constructs a new PackageAdd.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IPackageAdd);

        /** PackageAdd pkgs. */
        public pkgs: api.IPackage[];

        /**
         * Creates a new PackageAdd instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PackageAdd instance
         */
        public static create(properties?: api.IPackageAdd): api.PackageAdd;

        /**
         * Encodes the specified PackageAdd message. Does not implicitly {@link api.PackageAdd.verify|verify} messages.
         * @param message PackageAdd message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IPackageAdd, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PackageAdd message, length delimited. Does not implicitly {@link api.PackageAdd.verify|verify} messages.
         * @param message PackageAdd message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IPackageAdd, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PackageAdd message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PackageAdd
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.PackageAdd;

        /**
         * Decodes a PackageAdd message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PackageAdd
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.PackageAdd;

        /**
         * Verifies a PackageAdd message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PackageAdd message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PackageAdd
         */
        public static fromObject(object: { [k: string]: any }): api.PackageAdd;

        /**
         * Creates a plain object from a PackageAdd message. Also converts values to other types if specified.
         * @param message PackageAdd
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.PackageAdd, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PackageAdd to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a PackageRemove. */
    interface IPackageRemove {

        /** PackageRemove pkgs */
        pkgs?: (api.IPackage[]|null);
    }

    /** Represents a PackageRemove. */
    class PackageRemove implements IPackageRemove {

        /**
         * Constructs a new PackageRemove.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IPackageRemove);

        /** PackageRemove pkgs. */
        public pkgs: api.IPackage[];

        /**
         * Creates a new PackageRemove instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PackageRemove instance
         */
        public static create(properties?: api.IPackageRemove): api.PackageRemove;

        /**
         * Encodes the specified PackageRemove message. Does not implicitly {@link api.PackageRemove.verify|verify} messages.
         * @param message PackageRemove message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IPackageRemove, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PackageRemove message, length delimited. Does not implicitly {@link api.PackageRemove.verify|verify} messages.
         * @param message PackageRemove message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IPackageRemove, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PackageRemove message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PackageRemove
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.PackageRemove;

        /**
         * Decodes a PackageRemove message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PackageRemove
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.PackageRemove;

        /**
         * Verifies a PackageRemove message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PackageRemove message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PackageRemove
         */
        public static fromObject(object: { [k: string]: any }): api.PackageRemove;

        /**
         * Creates a plain object from a PackageRemove message. Also converts values to other types if specified.
         * @param message PackageRemove
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.PackageRemove, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PackageRemove to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a PackageInstall. */
    interface IPackageInstall {
    }

    /** Represents a PackageInstall. */
    class PackageInstall implements IPackageInstall {

        /**
         * Constructs a new PackageInstall.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IPackageInstall);

        /**
         * Creates a new PackageInstall instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PackageInstall instance
         */
        public static create(properties?: api.IPackageInstall): api.PackageInstall;

        /**
         * Encodes the specified PackageInstall message. Does not implicitly {@link api.PackageInstall.verify|verify} messages.
         * @param message PackageInstall message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IPackageInstall, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PackageInstall message, length delimited. Does not implicitly {@link api.PackageInstall.verify|verify} messages.
         * @param message PackageInstall message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IPackageInstall, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PackageInstall message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PackageInstall
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.PackageInstall;

        /**
         * Decodes a PackageInstall message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PackageInstall
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.PackageInstall;

        /**
         * Verifies a PackageInstall message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PackageInstall message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PackageInstall
         */
        public static fromObject(object: { [k: string]: any }): api.PackageInstall;

        /**
         * Creates a plain object from a PackageInstall message. Also converts values to other types if specified.
         * @param message PackageInstall
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.PackageInstall, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PackageInstall to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a PackageListSpecfile. */
    interface IPackageListSpecfile {
    }

    /** Represents a PackageListSpecfile. */
    class PackageListSpecfile implements IPackageListSpecfile {

        /**
         * Constructs a new PackageListSpecfile.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IPackageListSpecfile);

        /**
         * Creates a new PackageListSpecfile instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PackageListSpecfile instance
         */
        public static create(properties?: api.IPackageListSpecfile): api.PackageListSpecfile;

        /**
         * Encodes the specified PackageListSpecfile message. Does not implicitly {@link api.PackageListSpecfile.verify|verify} messages.
         * @param message PackageListSpecfile message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IPackageListSpecfile, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PackageListSpecfile message, length delimited. Does not implicitly {@link api.PackageListSpecfile.verify|verify} messages.
         * @param message PackageListSpecfile message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IPackageListSpecfile, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PackageListSpecfile message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PackageListSpecfile
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.PackageListSpecfile;

        /**
         * Decodes a PackageListSpecfile message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PackageListSpecfile
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.PackageListSpecfile;

        /**
         * Verifies a PackageListSpecfile message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PackageListSpecfile message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PackageListSpecfile
         */
        public static fromObject(object: { [k: string]: any }): api.PackageListSpecfile;

        /**
         * Creates a plain object from a PackageListSpecfile message. Also converts values to other types if specified.
         * @param message PackageListSpecfile
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.PackageListSpecfile, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PackageListSpecfile to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a PackageListSpecfileResp. */
    interface IPackageListSpecfileResp {

        /** PackageListSpecfileResp pkgs */
        pkgs?: (api.IPackage[]|null);
    }

    /** Represents a PackageListSpecfileResp. */
    class PackageListSpecfileResp implements IPackageListSpecfileResp {

        /**
         * Constructs a new PackageListSpecfileResp.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IPackageListSpecfileResp);

        /** PackageListSpecfileResp pkgs. */
        public pkgs: api.IPackage[];

        /**
         * Creates a new PackageListSpecfileResp instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PackageListSpecfileResp instance
         */
        public static create(properties?: api.IPackageListSpecfileResp): api.PackageListSpecfileResp;

        /**
         * Encodes the specified PackageListSpecfileResp message. Does not implicitly {@link api.PackageListSpecfileResp.verify|verify} messages.
         * @param message PackageListSpecfileResp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IPackageListSpecfileResp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PackageListSpecfileResp message, length delimited. Does not implicitly {@link api.PackageListSpecfileResp.verify|verify} messages.
         * @param message PackageListSpecfileResp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IPackageListSpecfileResp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PackageListSpecfileResp message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PackageListSpecfileResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.PackageListSpecfileResp;

        /**
         * Decodes a PackageListSpecfileResp message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PackageListSpecfileResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.PackageListSpecfileResp;

        /**
         * Verifies a PackageListSpecfileResp message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PackageListSpecfileResp message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PackageListSpecfileResp
         */
        public static fromObject(object: { [k: string]: any }): api.PackageListSpecfileResp;

        /**
         * Creates a plain object from a PackageListSpecfileResp message. Also converts values to other types if specified.
         * @param message PackageListSpecfileResp
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.PackageListSpecfileResp, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PackageListSpecfileResp to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a PackageCacheSave. */
    interface IPackageCacheSave {
    }

    /** Represents a PackageCacheSave. */
    class PackageCacheSave implements IPackageCacheSave {

        /**
         * Constructs a new PackageCacheSave.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IPackageCacheSave);

        /**
         * Creates a new PackageCacheSave instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PackageCacheSave instance
         */
        public static create(properties?: api.IPackageCacheSave): api.PackageCacheSave;

        /**
         * Encodes the specified PackageCacheSave message. Does not implicitly {@link api.PackageCacheSave.verify|verify} messages.
         * @param message PackageCacheSave message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IPackageCacheSave, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PackageCacheSave message, length delimited. Does not implicitly {@link api.PackageCacheSave.verify|verify} messages.
         * @param message PackageCacheSave message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IPackageCacheSave, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PackageCacheSave message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PackageCacheSave
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.PackageCacheSave;

        /**
         * Decodes a PackageCacheSave message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PackageCacheSave
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.PackageCacheSave;

        /**
         * Verifies a PackageCacheSave message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PackageCacheSave message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PackageCacheSave
         */
        public static fromObject(object: { [k: string]: any }): api.PackageCacheSave;

        /**
         * Creates a plain object from a PackageCacheSave message. Also converts values to other types if specified.
         * @param message PackageCacheSave
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.PackageCacheSave, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PackageCacheSave to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ChatScrollback. */
    interface IChatScrollback {

        /** ChatScrollback scrollback */
        scrollback?: (api.IChatMessage[]|null);
    }

    /** Represents a ChatScrollback. */
    class ChatScrollback implements IChatScrollback {

        /**
         * Constructs a new ChatScrollback.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IChatScrollback);

        /** ChatScrollback scrollback. */
        public scrollback: api.IChatMessage[];

        /**
         * Creates a new ChatScrollback instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ChatScrollback instance
         */
        public static create(properties?: api.IChatScrollback): api.ChatScrollback;

        /**
         * Encodes the specified ChatScrollback message. Does not implicitly {@link api.ChatScrollback.verify|verify} messages.
         * @param message ChatScrollback message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IChatScrollback, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ChatScrollback message, length delimited. Does not implicitly {@link api.ChatScrollback.verify|verify} messages.
         * @param message ChatScrollback message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IChatScrollback, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ChatScrollback message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ChatScrollback
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.ChatScrollback;

        /**
         * Decodes a ChatScrollback message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ChatScrollback
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.ChatScrollback;

        /**
         * Verifies a ChatScrollback message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ChatScrollback message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ChatScrollback
         */
        public static fromObject(object: { [k: string]: any }): api.ChatScrollback;

        /**
         * Creates a plain object from a ChatScrollback message. Also converts values to other types if specified.
         * @param message ChatScrollback
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.ChatScrollback, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ChatScrollback to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }
}
