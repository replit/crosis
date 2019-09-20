/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.api = (function() {

    /**
     * Namespace api.
     * @exports api
     * @namespace
     */
    var api = {};

    api.Command = (function() {

        /**
         * Properties of a Command.
         * @memberof api
         * @interface ICommand
         * @property {number|null} [channel] Command channel
         * @property {number|null} [session] Command session
         * @property {api.IOpenChannel|null} [openChan] Command openChan
         * @property {api.IOpenChannelRes|null} [openChanRes] Command openChanRes
         * @property {api.ICloseChannel|null} [closeChan] Command closeChan
         * @property {api.ICloseChannel|null} [closeChanRes] Command closeChanRes
         * @property {api.IContainerState|null} [containerState] Command containerState
         * @property {api.IPortOpen|null} [portOpen] Command portOpen
         * @property {api.IToast|null} [toast] Command toast
         * @property {api.IRunMain|null} [runMain] Command runMain
         * @property {api.IClear|null} [clear] Command clear
         * @property {string|null} ["eval"] Command eval
         * @property {string|null} [result] Command result
         * @property {string|null} [input] Command input
         * @property {string|null} [output] Command output
         * @property {string|null} [error] Command error
         * @property {api.ISaneTerm|null} [saneTerm] Command saneTerm
         * @property {api.IResizeTerm|null} [resizeTerm] Command resizeTerm
         * @property {api.State|null} [state] Command state
         * @property {api.IOK|null} [ok] Command ok
         * @property {api.IFile|null} [persist] Command persist
         * @property {api.IFile|null} [write] Command write
         * @property {api.IFile|null} [remove] Command remove
         * @property {api.IMove|null} [move] Command move
         * @property {api.IFile|null} [mkdir] Command mkdir
         * @property {api.IFile|null} [read] Command read
         * @property {api.IFile|null} [readdir] Command readdir
         * @property {api.IFiles|null} [files] Command files
         * @property {api.IFile|null} [file] Command file
         * @property {api.ICheckChanges|null} [checkChanges] Command checkChanges
         * @property {api.IFiles|null} [changedFiles] Command changedFiles
         * @property {api.ILintResults|null} [lintResults] Command lintResults
         * @property {api.IContainedTest|null} [runContainedTest] Command runContainedTest
         * @property {api.ITestResult|null} [testResult] Command testResult
         * @property {string|null} [debuggerStart] Command debuggerStart
         * @property {api.IRunMain|null} [debuggerStep] Command debuggerStep
         * @property {api.IDebugStatus|null} [debuggerStatus] Command debuggerStatus
         * @property {api.IEnsurePackages|null} [ensurePackages] Command ensurePackages
         * @property {api.IPing|null} [ping] Command ping
         * @property {api.IPong|null} [pong] Command pong
         * @property {api.IHello|null} [hello] Command hello
         * @property {api.IGoodbye|null} [goodbye] Command goodbye
         * @property {api.IHint|null} [hint] Command hint
         * @property {api.IConnect|null} [connect] Command connect
         * @property {api.ISend|null} [send] Command send
         * @property {api.IRecv|null} [recv] Command recv
         * @property {api.IDisconnect|null} [disconnect] Command disconnect
         * @property {api.IFileAuthReq|null} [fileAuthReq] Command fileAuthReq
         * @property {api.IFileAuthRes|null} [fileAuthRes] Command fileAuthRes
         * @property {api.IMultiFileAuthRes|null} [mutliFileAuthRes] Command mutliFileAuthRes
         * @property {api.IOTPacket|null} [ot] Command ot
         * @property {api.IOTStatus|null} [otstatus] Command otstatus
         * @property {api.IOTLinkFile|null} [otLinkFile] Command otLinkFile
         * @property {api.IOTCursor|null} [otNewCursor] Command otNewCursor
         * @property {api.IOTCursor|null} [otDeleteCursor] Command otDeleteCursor
         * @property {api.IFlush|null} [flush] Command flush
         * @property {api.IDebug|null} [debug] Command debug
         * @property {api.IStartVCR|null} [startVCR] Command startVCR
         * @property {api.IReadVCR|null} [readVCR] Command readVCR
         * @property {api.IVCRLog|null} [VCRLog] Command VCRLog
         * @property {api.IAuth|null} [auth] Command auth
         * @property {api.IExecInfo|null} [execInfo] Command execInfo
         * @property {api.IFile|null} [subscribe] Command subscribe
         * @property {api.IFile|null} [eventCreated] Command eventCreated
         * @property {api.IFile|null} [eventModified] Command eventModified
         * @property {api.IFile|null} [eventDeleted] Command eventDeleted
         * @property {api.IMove|null} [eventMoved] Command eventMoved
         * @property {api.ISubscribeFile|null} [subscribeFile] Command subscribeFile
         * @property {api.IFileEvent|null} [fileEvent] Command fileEvent
         * @property {api.IRoster|null} [roster] Command roster
         * @property {api.IUser|null} [join] Command join
         * @property {api.IUser|null} [part] Command part
         * @property {api.IExec|null} [exec] Command exec
         * @property {api.IPackageSearch|null} [packageSearch] Command packageSearch
         * @property {api.IPackageSearchResp|null} [packageSearchResp] Command packageSearchResp
         * @property {api.IPackageInfo|null} [packageInfo] Command packageInfo
         * @property {api.IPackageInfoResp|null} [packageInfoResp] Command packageInfoResp
         * @property {api.IPackageAdd|null} [packageAdd] Command packageAdd
         * @property {api.IPackageRemove|null} [packageRemove] Command packageRemove
         * @property {api.IPackageInstall|null} [packageInstall] Command packageInstall
         * @property {api.IPackageListSpecfile|null} [packageListSpecfile] Command packageListSpecfile
         * @property {api.IPackageListSpecfileResp|null} [packageListSpecfileResp] Command packageListSpecfileResp
         * @property {api.IPackageCacheSave|null} [packageCacheSave] Command packageCacheSave
         * @property {api.IChatMessage|null} [chatMessage] Command chatMessage
         * @property {api.IChatTyping|null} [chatTyping] Command chatTyping
         * @property {api.IChatScrollback|null} [chatScrollback] Command chatScrollback
         * @property {string|null} [ref] Command ref
         */

        /**
         * Constructs a new Command.
         * @memberof api
         * @classdesc Represents a Command.
         * @implements ICommand
         * @constructor
         * @param {api.ICommand=} [properties] Properties to set
         */
        function Command(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Command channel.
         * @member {number} channel
         * @memberof api.Command
         * @instance
         */
        Command.prototype.channel = 0;

        /**
         * Command session.
         * @member {number} session
         * @memberof api.Command
         * @instance
         */
        Command.prototype.session = 0;

        /**
         * Command openChan.
         * @member {api.IOpenChannel|null|undefined} openChan
         * @memberof api.Command
         * @instance
         */
        Command.prototype.openChan = null;

        /**
         * Command openChanRes.
         * @member {api.IOpenChannelRes|null|undefined} openChanRes
         * @memberof api.Command
         * @instance
         */
        Command.prototype.openChanRes = null;

        /**
         * Command closeChan.
         * @member {api.ICloseChannel|null|undefined} closeChan
         * @memberof api.Command
         * @instance
         */
        Command.prototype.closeChan = null;

        /**
         * Command closeChanRes.
         * @member {api.ICloseChannel|null|undefined} closeChanRes
         * @memberof api.Command
         * @instance
         */
        Command.prototype.closeChanRes = null;

        /**
         * Command containerState.
         * @member {api.IContainerState|null|undefined} containerState
         * @memberof api.Command
         * @instance
         */
        Command.prototype.containerState = null;

        /**
         * Command portOpen.
         * @member {api.IPortOpen|null|undefined} portOpen
         * @memberof api.Command
         * @instance
         */
        Command.prototype.portOpen = null;

        /**
         * Command toast.
         * @member {api.IToast|null|undefined} toast
         * @memberof api.Command
         * @instance
         */
        Command.prototype.toast = null;

        /**
         * Command runMain.
         * @member {api.IRunMain|null|undefined} runMain
         * @memberof api.Command
         * @instance
         */
        Command.prototype.runMain = null;

        /**
         * Command clear.
         * @member {api.IClear|null|undefined} clear
         * @memberof api.Command
         * @instance
         */
        Command.prototype.clear = null;

        /**
         * Command eval.
         * @member {string} eval
         * @memberof api.Command
         * @instance
         */
        Command.prototype["eval"] = "";

        /**
         * Command result.
         * @member {string} result
         * @memberof api.Command
         * @instance
         */
        Command.prototype.result = "";

        /**
         * Command input.
         * @member {string} input
         * @memberof api.Command
         * @instance
         */
        Command.prototype.input = "";

        /**
         * Command output.
         * @member {string} output
         * @memberof api.Command
         * @instance
         */
        Command.prototype.output = "";

        /**
         * Command error.
         * @member {string} error
         * @memberof api.Command
         * @instance
         */
        Command.prototype.error = "";

        /**
         * Command saneTerm.
         * @member {api.ISaneTerm|null|undefined} saneTerm
         * @memberof api.Command
         * @instance
         */
        Command.prototype.saneTerm = null;

        /**
         * Command resizeTerm.
         * @member {api.IResizeTerm|null|undefined} resizeTerm
         * @memberof api.Command
         * @instance
         */
        Command.prototype.resizeTerm = null;

        /**
         * Command state.
         * @member {api.State} state
         * @memberof api.Command
         * @instance
         */
        Command.prototype.state = 0;

        /**
         * Command ok.
         * @member {api.IOK|null|undefined} ok
         * @memberof api.Command
         * @instance
         */
        Command.prototype.ok = null;

        /**
         * Command persist.
         * @member {api.IFile|null|undefined} persist
         * @memberof api.Command
         * @instance
         */
        Command.prototype.persist = null;

        /**
         * Command write.
         * @member {api.IFile|null|undefined} write
         * @memberof api.Command
         * @instance
         */
        Command.prototype.write = null;

        /**
         * Command remove.
         * @member {api.IFile|null|undefined} remove
         * @memberof api.Command
         * @instance
         */
        Command.prototype.remove = null;

        /**
         * Command move.
         * @member {api.IMove|null|undefined} move
         * @memberof api.Command
         * @instance
         */
        Command.prototype.move = null;

        /**
         * Command mkdir.
         * @member {api.IFile|null|undefined} mkdir
         * @memberof api.Command
         * @instance
         */
        Command.prototype.mkdir = null;

        /**
         * Command read.
         * @member {api.IFile|null|undefined} read
         * @memberof api.Command
         * @instance
         */
        Command.prototype.read = null;

        /**
         * Command readdir.
         * @member {api.IFile|null|undefined} readdir
         * @memberof api.Command
         * @instance
         */
        Command.prototype.readdir = null;

        /**
         * Command files.
         * @member {api.IFiles|null|undefined} files
         * @memberof api.Command
         * @instance
         */
        Command.prototype.files = null;

        /**
         * Command file.
         * @member {api.IFile|null|undefined} file
         * @memberof api.Command
         * @instance
         */
        Command.prototype.file = null;

        /**
         * Command checkChanges.
         * @member {api.ICheckChanges|null|undefined} checkChanges
         * @memberof api.Command
         * @instance
         */
        Command.prototype.checkChanges = null;

        /**
         * Command changedFiles.
         * @member {api.IFiles|null|undefined} changedFiles
         * @memberof api.Command
         * @instance
         */
        Command.prototype.changedFiles = null;

        /**
         * Command lintResults.
         * @member {api.ILintResults|null|undefined} lintResults
         * @memberof api.Command
         * @instance
         */
        Command.prototype.lintResults = null;

        /**
         * Command runContainedTest.
         * @member {api.IContainedTest|null|undefined} runContainedTest
         * @memberof api.Command
         * @instance
         */
        Command.prototype.runContainedTest = null;

        /**
         * Command testResult.
         * @member {api.ITestResult|null|undefined} testResult
         * @memberof api.Command
         * @instance
         */
        Command.prototype.testResult = null;

        /**
         * Command debuggerStart.
         * @member {string} debuggerStart
         * @memberof api.Command
         * @instance
         */
        Command.prototype.debuggerStart = "";

        /**
         * Command debuggerStep.
         * @member {api.IRunMain|null|undefined} debuggerStep
         * @memberof api.Command
         * @instance
         */
        Command.prototype.debuggerStep = null;

        /**
         * Command debuggerStatus.
         * @member {api.IDebugStatus|null|undefined} debuggerStatus
         * @memberof api.Command
         * @instance
         */
        Command.prototype.debuggerStatus = null;

        /**
         * Command ensurePackages.
         * @member {api.IEnsurePackages|null|undefined} ensurePackages
         * @memberof api.Command
         * @instance
         */
        Command.prototype.ensurePackages = null;

        /**
         * Command ping.
         * @member {api.IPing|null|undefined} ping
         * @memberof api.Command
         * @instance
         */
        Command.prototype.ping = null;

        /**
         * Command pong.
         * @member {api.IPong|null|undefined} pong
         * @memberof api.Command
         * @instance
         */
        Command.prototype.pong = null;

        /**
         * Command hello.
         * @member {api.IHello|null|undefined} hello
         * @memberof api.Command
         * @instance
         */
        Command.prototype.hello = null;

        /**
         * Command goodbye.
         * @member {api.IGoodbye|null|undefined} goodbye
         * @memberof api.Command
         * @instance
         */
        Command.prototype.goodbye = null;

        /**
         * Command hint.
         * @member {api.IHint|null|undefined} hint
         * @memberof api.Command
         * @instance
         */
        Command.prototype.hint = null;

        /**
         * Command connect.
         * @member {api.IConnect|null|undefined} connect
         * @memberof api.Command
         * @instance
         */
        Command.prototype.connect = null;

        /**
         * Command send.
         * @member {api.ISend|null|undefined} send
         * @memberof api.Command
         * @instance
         */
        Command.prototype.send = null;

        /**
         * Command recv.
         * @member {api.IRecv|null|undefined} recv
         * @memberof api.Command
         * @instance
         */
        Command.prototype.recv = null;

        /**
         * Command disconnect.
         * @member {api.IDisconnect|null|undefined} disconnect
         * @memberof api.Command
         * @instance
         */
        Command.prototype.disconnect = null;

        /**
         * Command fileAuthReq.
         * @member {api.IFileAuthReq|null|undefined} fileAuthReq
         * @memberof api.Command
         * @instance
         */
        Command.prototype.fileAuthReq = null;

        /**
         * Command fileAuthRes.
         * @member {api.IFileAuthRes|null|undefined} fileAuthRes
         * @memberof api.Command
         * @instance
         */
        Command.prototype.fileAuthRes = null;

        /**
         * Command mutliFileAuthRes.
         * @member {api.IMultiFileAuthRes|null|undefined} mutliFileAuthRes
         * @memberof api.Command
         * @instance
         */
        Command.prototype.mutliFileAuthRes = null;

        /**
         * Command ot.
         * @member {api.IOTPacket|null|undefined} ot
         * @memberof api.Command
         * @instance
         */
        Command.prototype.ot = null;

        /**
         * Command otstatus.
         * @member {api.IOTStatus|null|undefined} otstatus
         * @memberof api.Command
         * @instance
         */
        Command.prototype.otstatus = null;

        /**
         * Command otLinkFile.
         * @member {api.IOTLinkFile|null|undefined} otLinkFile
         * @memberof api.Command
         * @instance
         */
        Command.prototype.otLinkFile = null;

        /**
         * Command otNewCursor.
         * @member {api.IOTCursor|null|undefined} otNewCursor
         * @memberof api.Command
         * @instance
         */
        Command.prototype.otNewCursor = null;

        /**
         * Command otDeleteCursor.
         * @member {api.IOTCursor|null|undefined} otDeleteCursor
         * @memberof api.Command
         * @instance
         */
        Command.prototype.otDeleteCursor = null;

        /**
         * Command flush.
         * @member {api.IFlush|null|undefined} flush
         * @memberof api.Command
         * @instance
         */
        Command.prototype.flush = null;

        /**
         * Command debug.
         * @member {api.IDebug|null|undefined} debug
         * @memberof api.Command
         * @instance
         */
        Command.prototype.debug = null;

        /**
         * Command startVCR.
         * @member {api.IStartVCR|null|undefined} startVCR
         * @memberof api.Command
         * @instance
         */
        Command.prototype.startVCR = null;

        /**
         * Command readVCR.
         * @member {api.IReadVCR|null|undefined} readVCR
         * @memberof api.Command
         * @instance
         */
        Command.prototype.readVCR = null;

        /**
         * Command VCRLog.
         * @member {api.IVCRLog|null|undefined} VCRLog
         * @memberof api.Command
         * @instance
         */
        Command.prototype.VCRLog = null;

        /**
         * Command auth.
         * @member {api.IAuth|null|undefined} auth
         * @memberof api.Command
         * @instance
         */
        Command.prototype.auth = null;

        /**
         * Command execInfo.
         * @member {api.IExecInfo|null|undefined} execInfo
         * @memberof api.Command
         * @instance
         */
        Command.prototype.execInfo = null;

        /**
         * Command subscribe.
         * @member {api.IFile|null|undefined} subscribe
         * @memberof api.Command
         * @instance
         */
        Command.prototype.subscribe = null;

        /**
         * Command eventCreated.
         * @member {api.IFile|null|undefined} eventCreated
         * @memberof api.Command
         * @instance
         */
        Command.prototype.eventCreated = null;

        /**
         * Command eventModified.
         * @member {api.IFile|null|undefined} eventModified
         * @memberof api.Command
         * @instance
         */
        Command.prototype.eventModified = null;

        /**
         * Command eventDeleted.
         * @member {api.IFile|null|undefined} eventDeleted
         * @memberof api.Command
         * @instance
         */
        Command.prototype.eventDeleted = null;

        /**
         * Command eventMoved.
         * @member {api.IMove|null|undefined} eventMoved
         * @memberof api.Command
         * @instance
         */
        Command.prototype.eventMoved = null;

        /**
         * Command subscribeFile.
         * @member {api.ISubscribeFile|null|undefined} subscribeFile
         * @memberof api.Command
         * @instance
         */
        Command.prototype.subscribeFile = null;

        /**
         * Command fileEvent.
         * @member {api.IFileEvent|null|undefined} fileEvent
         * @memberof api.Command
         * @instance
         */
        Command.prototype.fileEvent = null;

        /**
         * Command roster.
         * @member {api.IRoster|null|undefined} roster
         * @memberof api.Command
         * @instance
         */
        Command.prototype.roster = null;

        /**
         * Command join.
         * @member {api.IUser|null|undefined} join
         * @memberof api.Command
         * @instance
         */
        Command.prototype.join = null;

        /**
         * Command part.
         * @member {api.IUser|null|undefined} part
         * @memberof api.Command
         * @instance
         */
        Command.prototype.part = null;

        /**
         * Command exec.
         * @member {api.IExec|null|undefined} exec
         * @memberof api.Command
         * @instance
         */
        Command.prototype.exec = null;

        /**
         * Command packageSearch.
         * @member {api.IPackageSearch|null|undefined} packageSearch
         * @memberof api.Command
         * @instance
         */
        Command.prototype.packageSearch = null;

        /**
         * Command packageSearchResp.
         * @member {api.IPackageSearchResp|null|undefined} packageSearchResp
         * @memberof api.Command
         * @instance
         */
        Command.prototype.packageSearchResp = null;

        /**
         * Command packageInfo.
         * @member {api.IPackageInfo|null|undefined} packageInfo
         * @memberof api.Command
         * @instance
         */
        Command.prototype.packageInfo = null;

        /**
         * Command packageInfoResp.
         * @member {api.IPackageInfoResp|null|undefined} packageInfoResp
         * @memberof api.Command
         * @instance
         */
        Command.prototype.packageInfoResp = null;

        /**
         * Command packageAdd.
         * @member {api.IPackageAdd|null|undefined} packageAdd
         * @memberof api.Command
         * @instance
         */
        Command.prototype.packageAdd = null;

        /**
         * Command packageRemove.
         * @member {api.IPackageRemove|null|undefined} packageRemove
         * @memberof api.Command
         * @instance
         */
        Command.prototype.packageRemove = null;

        /**
         * Command packageInstall.
         * @member {api.IPackageInstall|null|undefined} packageInstall
         * @memberof api.Command
         * @instance
         */
        Command.prototype.packageInstall = null;

        /**
         * Command packageListSpecfile.
         * @member {api.IPackageListSpecfile|null|undefined} packageListSpecfile
         * @memberof api.Command
         * @instance
         */
        Command.prototype.packageListSpecfile = null;

        /**
         * Command packageListSpecfileResp.
         * @member {api.IPackageListSpecfileResp|null|undefined} packageListSpecfileResp
         * @memberof api.Command
         * @instance
         */
        Command.prototype.packageListSpecfileResp = null;

        /**
         * Command packageCacheSave.
         * @member {api.IPackageCacheSave|null|undefined} packageCacheSave
         * @memberof api.Command
         * @instance
         */
        Command.prototype.packageCacheSave = null;

        /**
         * Command chatMessage.
         * @member {api.IChatMessage|null|undefined} chatMessage
         * @memberof api.Command
         * @instance
         */
        Command.prototype.chatMessage = null;

        /**
         * Command chatTyping.
         * @member {api.IChatTyping|null|undefined} chatTyping
         * @memberof api.Command
         * @instance
         */
        Command.prototype.chatTyping = null;

        /**
         * Command chatScrollback.
         * @member {api.IChatScrollback|null|undefined} chatScrollback
         * @memberof api.Command
         * @instance
         */
        Command.prototype.chatScrollback = null;

        /**
         * Command ref.
         * @member {string} ref
         * @memberof api.Command
         * @instance
         */
        Command.prototype.ref = "";

        // OneOf field names bound to virtual getters and setters
        var $oneOfFields;

        /**
         * Command body.
         * @member {"openChan"|"openChanRes"|"closeChan"|"closeChanRes"|"containerState"|"portOpen"|"toast"|"runMain"|"clear"|"eval"|"result"|"input"|"output"|"error"|"saneTerm"|"resizeTerm"|"state"|"ok"|"persist"|"write"|"remove"|"move"|"mkdir"|"read"|"readdir"|"files"|"file"|"checkChanges"|"changedFiles"|"lintResults"|"runContainedTest"|"testResult"|"debuggerStart"|"debuggerStep"|"debuggerStatus"|"ensurePackages"|"ping"|"pong"|"hello"|"goodbye"|"hint"|"connect"|"send"|"recv"|"disconnect"|"fileAuthReq"|"fileAuthRes"|"mutliFileAuthRes"|"ot"|"otstatus"|"otLinkFile"|"otNewCursor"|"otDeleteCursor"|"flush"|"debug"|"startVCR"|"readVCR"|"VCRLog"|"auth"|"execInfo"|"subscribe"|"eventCreated"|"eventModified"|"eventDeleted"|"eventMoved"|"subscribeFile"|"fileEvent"|"roster"|"join"|"part"|"exec"|"packageSearch"|"packageSearchResp"|"packageInfo"|"packageInfoResp"|"packageAdd"|"packageRemove"|"packageInstall"|"packageListSpecfile"|"packageListSpecfileResp"|"packageCacheSave"|"chatMessage"|"chatTyping"|"chatScrollback"|undefined} body
         * @memberof api.Command
         * @instance
         */
        Object.defineProperty(Command.prototype, "body", {
            get: $util.oneOfGetter($oneOfFields = ["openChan", "openChanRes", "closeChan", "closeChanRes", "containerState", "portOpen", "toast", "runMain", "clear", "eval", "result", "input", "output", "error", "saneTerm", "resizeTerm", "state", "ok", "persist", "write", "remove", "move", "mkdir", "read", "readdir", "files", "file", "checkChanges", "changedFiles", "lintResults", "runContainedTest", "testResult", "debuggerStart", "debuggerStep", "debuggerStatus", "ensurePackages", "ping", "pong", "hello", "goodbye", "hint", "connect", "send", "recv", "disconnect", "fileAuthReq", "fileAuthRes", "mutliFileAuthRes", "ot", "otstatus", "otLinkFile", "otNewCursor", "otDeleteCursor", "flush", "debug", "startVCR", "readVCR", "VCRLog", "auth", "execInfo", "subscribe", "eventCreated", "eventModified", "eventDeleted", "eventMoved", "subscribeFile", "fileEvent", "roster", "join", "part", "exec", "packageSearch", "packageSearchResp", "packageInfo", "packageInfoResp", "packageAdd", "packageRemove", "packageInstall", "packageListSpecfile", "packageListSpecfileResp", "packageCacheSave", "chatMessage", "chatTyping", "chatScrollback"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new Command instance using the specified properties.
         * @function create
         * @memberof api.Command
         * @static
         * @param {api.ICommand=} [properties] Properties to set
         * @returns {api.Command} Command instance
         */
        Command.create = function create(properties) {
            return new Command(properties);
        };

        /**
         * Encodes the specified Command message. Does not implicitly {@link api.Command.verify|verify} messages.
         * @function encode
         * @memberof api.Command
         * @static
         * @param {api.ICommand} message Command message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Command.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.channel != null && message.hasOwnProperty("channel"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.channel);
            if (message.session != null && message.hasOwnProperty("session"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.session);
            if (message.openChan != null && message.hasOwnProperty("openChan"))
                $root.api.OpenChannel.encode(message.openChan, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.openChanRes != null && message.hasOwnProperty("openChanRes"))
                $root.api.OpenChannelRes.encode(message.openChanRes, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            if (message.closeChan != null && message.hasOwnProperty("closeChan"))
                $root.api.CloseChannel.encode(message.closeChan, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
            if (message.closeChanRes != null && message.hasOwnProperty("closeChanRes"))
                $root.api.CloseChannel.encode(message.closeChanRes, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
            if (message.containerState != null && message.hasOwnProperty("containerState"))
                $root.api.ContainerState.encode(message.containerState, writer.uint32(/* id 9, wireType 2 =*/74).fork()).ldelim();
            if (message.portOpen != null && message.hasOwnProperty("portOpen"))
                $root.api.PortOpen.encode(message.portOpen, writer.uint32(/* id 10, wireType 2 =*/82).fork()).ldelim();
            if (message.toast != null && message.hasOwnProperty("toast"))
                $root.api.Toast.encode(message.toast, writer.uint32(/* id 11, wireType 2 =*/90).fork()).ldelim();
            if (message.runMain != null && message.hasOwnProperty("runMain"))
                $root.api.RunMain.encode(message.runMain, writer.uint32(/* id 16, wireType 2 =*/130).fork()).ldelim();
            if (message.clear != null && message.hasOwnProperty("clear"))
                $root.api.Clear.encode(message.clear, writer.uint32(/* id 17, wireType 2 =*/138).fork()).ldelim();
            if (message["eval"] != null && message.hasOwnProperty("eval"))
                writer.uint32(/* id 20, wireType 2 =*/162).string(message["eval"]);
            if (message.result != null && message.hasOwnProperty("result"))
                writer.uint32(/* id 21, wireType 2 =*/170).string(message.result);
            if (message.input != null && message.hasOwnProperty("input"))
                writer.uint32(/* id 22, wireType 2 =*/178).string(message.input);
            if (message.output != null && message.hasOwnProperty("output"))
                writer.uint32(/* id 23, wireType 2 =*/186).string(message.output);
            if (message.error != null && message.hasOwnProperty("error"))
                writer.uint32(/* id 24, wireType 2 =*/194).string(message.error);
            if (message.saneTerm != null && message.hasOwnProperty("saneTerm"))
                $root.api.SaneTerm.encode(message.saneTerm, writer.uint32(/* id 26, wireType 2 =*/210).fork()).ldelim();
            if (message.resizeTerm != null && message.hasOwnProperty("resizeTerm"))
                $root.api.ResizeTerm.encode(message.resizeTerm, writer.uint32(/* id 27, wireType 2 =*/218).fork()).ldelim();
            if (message.state != null && message.hasOwnProperty("state"))
                writer.uint32(/* id 28, wireType 0 =*/224).int32(message.state);
            if (message.ok != null && message.hasOwnProperty("ok"))
                $root.api.OK.encode(message.ok, writer.uint32(/* id 30, wireType 2 =*/242).fork()).ldelim();
            if (message.persist != null && message.hasOwnProperty("persist"))
                $root.api.File.encode(message.persist, writer.uint32(/* id 31, wireType 2 =*/250).fork()).ldelim();
            if (message.write != null && message.hasOwnProperty("write"))
                $root.api.File.encode(message.write, writer.uint32(/* id 32, wireType 2 =*/258).fork()).ldelim();
            if (message.remove != null && message.hasOwnProperty("remove"))
                $root.api.File.encode(message.remove, writer.uint32(/* id 33, wireType 2 =*/266).fork()).ldelim();
            if (message.move != null && message.hasOwnProperty("move"))
                $root.api.Move.encode(message.move, writer.uint32(/* id 34, wireType 2 =*/274).fork()).ldelim();
            if (message.read != null && message.hasOwnProperty("read"))
                $root.api.File.encode(message.read, writer.uint32(/* id 35, wireType 2 =*/282).fork()).ldelim();
            if (message.readdir != null && message.hasOwnProperty("readdir"))
                $root.api.File.encode(message.readdir, writer.uint32(/* id 37, wireType 2 =*/298).fork()).ldelim();
            if (message.files != null && message.hasOwnProperty("files"))
                $root.api.Files.encode(message.files, writer.uint32(/* id 38, wireType 2 =*/306).fork()).ldelim();
            if (message.mkdir != null && message.hasOwnProperty("mkdir"))
                $root.api.File.encode(message.mkdir, writer.uint32(/* id 39, wireType 2 =*/314).fork()).ldelim();
            if (message.file != null && message.hasOwnProperty("file"))
                $root.api.File.encode(message.file, writer.uint32(/* id 40, wireType 2 =*/322).fork()).ldelim();
            if (message.checkChanges != null && message.hasOwnProperty("checkChanges"))
                $root.api.CheckChanges.encode(message.checkChanges, writer.uint32(/* id 42, wireType 2 =*/338).fork()).ldelim();
            if (message.changedFiles != null && message.hasOwnProperty("changedFiles"))
                $root.api.Files.encode(message.changedFiles, writer.uint32(/* id 43, wireType 2 =*/346).fork()).ldelim();
            if (message.lintResults != null && message.hasOwnProperty("lintResults"))
                $root.api.LintResults.encode(message.lintResults, writer.uint32(/* id 44, wireType 2 =*/354).fork()).ldelim();
            if (message.runContainedTest != null && message.hasOwnProperty("runContainedTest"))
                $root.api.ContainedTest.encode(message.runContainedTest, writer.uint32(/* id 70, wireType 2 =*/562).fork()).ldelim();
            if (message.testResult != null && message.hasOwnProperty("testResult"))
                $root.api.TestResult.encode(message.testResult, writer.uint32(/* id 71, wireType 2 =*/570).fork()).ldelim();
            if (message.debuggerStart != null && message.hasOwnProperty("debuggerStart"))
                writer.uint32(/* id 90, wireType 2 =*/722).string(message.debuggerStart);
            if (message.debuggerStep != null && message.hasOwnProperty("debuggerStep"))
                $root.api.RunMain.encode(message.debuggerStep, writer.uint32(/* id 91, wireType 2 =*/730).fork()).ldelim();
            if (message.debuggerStatus != null && message.hasOwnProperty("debuggerStatus"))
                $root.api.DebugStatus.encode(message.debuggerStatus, writer.uint32(/* id 92, wireType 2 =*/738).fork()).ldelim();
            if (message.ensurePackages != null && message.hasOwnProperty("ensurePackages"))
                $root.api.EnsurePackages.encode(message.ensurePackages, writer.uint32(/* id 100, wireType 2 =*/802).fork()).ldelim();
            if (message.ping != null && message.hasOwnProperty("ping"))
                $root.api.Ping.encode(message.ping, writer.uint32(/* id 120, wireType 2 =*/962).fork()).ldelim();
            if (message.pong != null && message.hasOwnProperty("pong"))
                $root.api.Pong.encode(message.pong, writer.uint32(/* id 121, wireType 2 =*/970).fork()).ldelim();
            if (message.hello != null && message.hasOwnProperty("hello"))
                $root.api.Hello.encode(message.hello, writer.uint32(/* id 122, wireType 2 =*/978).fork()).ldelim();
            if (message.goodbye != null && message.hasOwnProperty("goodbye"))
                $root.api.Goodbye.encode(message.goodbye, writer.uint32(/* id 123, wireType 2 =*/986).fork()).ldelim();
            if (message.hint != null && message.hasOwnProperty("hint"))
                $root.api.Hint.encode(message.hint, writer.uint32(/* id 130, wireType 2 =*/1042).fork()).ldelim();
            if (message.connect != null && message.hasOwnProperty("connect"))
                $root.api.Connect.encode(message.connect, writer.uint32(/* id 150, wireType 2 =*/1202).fork()).ldelim();
            if (message.send != null && message.hasOwnProperty("send"))
                $root.api.Send.encode(message.send, writer.uint32(/* id 151, wireType 2 =*/1210).fork()).ldelim();
            if (message.recv != null && message.hasOwnProperty("recv"))
                $root.api.Recv.encode(message.recv, writer.uint32(/* id 152, wireType 2 =*/1218).fork()).ldelim();
            if (message.disconnect != null && message.hasOwnProperty("disconnect"))
                $root.api.Disconnect.encode(message.disconnect, writer.uint32(/* id 153, wireType 2 =*/1226).fork()).ldelim();
            if (message.fileAuthReq != null && message.hasOwnProperty("fileAuthReq"))
                $root.api.FileAuthReq.encode(message.fileAuthReq, writer.uint32(/* id 200, wireType 2 =*/1602).fork()).ldelim();
            if (message.fileAuthRes != null && message.hasOwnProperty("fileAuthRes"))
                $root.api.FileAuthRes.encode(message.fileAuthRes, writer.uint32(/* id 201, wireType 2 =*/1610).fork()).ldelim();
            if (message.mutliFileAuthRes != null && message.hasOwnProperty("mutliFileAuthRes"))
                $root.api.MultiFileAuthRes.encode(message.mutliFileAuthRes, writer.uint32(/* id 202, wireType 2 =*/1618).fork()).ldelim();
            if (message.ot != null && message.hasOwnProperty("ot"))
                $root.api.OTPacket.encode(message.ot, writer.uint32(/* id 220, wireType 2 =*/1762).fork()).ldelim();
            if (message.otstatus != null && message.hasOwnProperty("otstatus"))
                $root.api.OTStatus.encode(message.otstatus, writer.uint32(/* id 221, wireType 2 =*/1770).fork()).ldelim();
            if (message.otLinkFile != null && message.hasOwnProperty("otLinkFile"))
                $root.api.OTLinkFile.encode(message.otLinkFile, writer.uint32(/* id 222, wireType 2 =*/1778).fork()).ldelim();
            if (message.otNewCursor != null && message.hasOwnProperty("otNewCursor"))
                $root.api.OTCursor.encode(message.otNewCursor, writer.uint32(/* id 223, wireType 2 =*/1786).fork()).ldelim();
            if (message.otDeleteCursor != null && message.hasOwnProperty("otDeleteCursor"))
                $root.api.OTCursor.encode(message.otDeleteCursor, writer.uint32(/* id 224, wireType 2 =*/1794).fork()).ldelim();
            if (message.debug != null && message.hasOwnProperty("debug"))
                $root.api.Debug.encode(message.debug, writer.uint32(/* id 230, wireType 2 =*/1842).fork()).ldelim();
            if (message.startVCR != null && message.hasOwnProperty("startVCR"))
                $root.api.StartVCR.encode(message.startVCR, writer.uint32(/* id 231, wireType 2 =*/1850).fork()).ldelim();
            if (message.readVCR != null && message.hasOwnProperty("readVCR"))
                $root.api.ReadVCR.encode(message.readVCR, writer.uint32(/* id 232, wireType 2 =*/1858).fork()).ldelim();
            if (message.VCRLog != null && message.hasOwnProperty("VCRLog"))
                $root.api.VCRLog.encode(message.VCRLog, writer.uint32(/* id 233, wireType 2 =*/1866).fork()).ldelim();
            if (message.auth != null && message.hasOwnProperty("auth"))
                $root.api.Auth.encode(message.auth, writer.uint32(/* id 235, wireType 2 =*/1882).fork()).ldelim();
            if (message.execInfo != null && message.hasOwnProperty("execInfo"))
                $root.api.ExecInfo.encode(message.execInfo, writer.uint32(/* id 240, wireType 2 =*/1922).fork()).ldelim();
            if (message.subscribe != null && message.hasOwnProperty("subscribe"))
                $root.api.File.encode(message.subscribe, writer.uint32(/* id 250, wireType 2 =*/2002).fork()).ldelim();
            if (message.flush != null && message.hasOwnProperty("flush"))
                $root.api.Flush.encode(message.flush, writer.uint32(/* id 251, wireType 2 =*/2010).fork()).ldelim();
            if (message.eventCreated != null && message.hasOwnProperty("eventCreated"))
                $root.api.File.encode(message.eventCreated, writer.uint32(/* id 252, wireType 2 =*/2018).fork()).ldelim();
            if (message.eventModified != null && message.hasOwnProperty("eventModified"))
                $root.api.File.encode(message.eventModified, writer.uint32(/* id 253, wireType 2 =*/2026).fork()).ldelim();
            if (message.eventDeleted != null && message.hasOwnProperty("eventDeleted"))
                $root.api.File.encode(message.eventDeleted, writer.uint32(/* id 254, wireType 2 =*/2034).fork()).ldelim();
            if (message.eventMoved != null && message.hasOwnProperty("eventMoved"))
                $root.api.Move.encode(message.eventMoved, writer.uint32(/* id 255, wireType 2 =*/2042).fork()).ldelim();
            if (message.subscribeFile != null && message.hasOwnProperty("subscribeFile"))
                $root.api.SubscribeFile.encode(message.subscribeFile, writer.uint32(/* id 256, wireType 2 =*/2050).fork()).ldelim();
            if (message.fileEvent != null && message.hasOwnProperty("fileEvent"))
                $root.api.FileEvent.encode(message.fileEvent, writer.uint32(/* id 257, wireType 2 =*/2058).fork()).ldelim();
            if (message.roster != null && message.hasOwnProperty("roster"))
                $root.api.Roster.encode(message.roster, writer.uint32(/* id 260, wireType 2 =*/2082).fork()).ldelim();
            if (message.join != null && message.hasOwnProperty("join"))
                $root.api.User.encode(message.join, writer.uint32(/* id 261, wireType 2 =*/2090).fork()).ldelim();
            if (message.part != null && message.hasOwnProperty("part"))
                $root.api.User.encode(message.part, writer.uint32(/* id 262, wireType 2 =*/2098).fork()).ldelim();
            if (message.exec != null && message.hasOwnProperty("exec"))
                $root.api.Exec.encode(message.exec, writer.uint32(/* id 270, wireType 2 =*/2162).fork()).ldelim();
            if (message.packageSearch != null && message.hasOwnProperty("packageSearch"))
                $root.api.PackageSearch.encode(message.packageSearch, writer.uint32(/* id 280, wireType 2 =*/2242).fork()).ldelim();
            if (message.packageSearchResp != null && message.hasOwnProperty("packageSearchResp"))
                $root.api.PackageSearchResp.encode(message.packageSearchResp, writer.uint32(/* id 281, wireType 2 =*/2250).fork()).ldelim();
            if (message.packageInfo != null && message.hasOwnProperty("packageInfo"))
                $root.api.PackageInfo.encode(message.packageInfo, writer.uint32(/* id 282, wireType 2 =*/2258).fork()).ldelim();
            if (message.packageInfoResp != null && message.hasOwnProperty("packageInfoResp"))
                $root.api.PackageInfoResp.encode(message.packageInfoResp, writer.uint32(/* id 283, wireType 2 =*/2266).fork()).ldelim();
            if (message.packageAdd != null && message.hasOwnProperty("packageAdd"))
                $root.api.PackageAdd.encode(message.packageAdd, writer.uint32(/* id 284, wireType 2 =*/2274).fork()).ldelim();
            if (message.packageRemove != null && message.hasOwnProperty("packageRemove"))
                $root.api.PackageRemove.encode(message.packageRemove, writer.uint32(/* id 285, wireType 2 =*/2282).fork()).ldelim();
            if (message.packageInstall != null && message.hasOwnProperty("packageInstall"))
                $root.api.PackageInstall.encode(message.packageInstall, writer.uint32(/* id 286, wireType 2 =*/2290).fork()).ldelim();
            if (message.packageListSpecfile != null && message.hasOwnProperty("packageListSpecfile"))
                $root.api.PackageListSpecfile.encode(message.packageListSpecfile, writer.uint32(/* id 287, wireType 2 =*/2298).fork()).ldelim();
            if (message.packageListSpecfileResp != null && message.hasOwnProperty("packageListSpecfileResp"))
                $root.api.PackageListSpecfileResp.encode(message.packageListSpecfileResp, writer.uint32(/* id 288, wireType 2 =*/2306).fork()).ldelim();
            if (message.packageCacheSave != null && message.hasOwnProperty("packageCacheSave"))
                $root.api.PackageCacheSave.encode(message.packageCacheSave, writer.uint32(/* id 289, wireType 2 =*/2314).fork()).ldelim();
            if (message.chatMessage != null && message.hasOwnProperty("chatMessage"))
                $root.api.ChatMessage.encode(message.chatMessage, writer.uint32(/* id 310, wireType 2 =*/2482).fork()).ldelim();
            if (message.chatTyping != null && message.hasOwnProperty("chatTyping"))
                $root.api.ChatTyping.encode(message.chatTyping, writer.uint32(/* id 311, wireType 2 =*/2490).fork()).ldelim();
            if (message.chatScrollback != null && message.hasOwnProperty("chatScrollback"))
                $root.api.ChatScrollback.encode(message.chatScrollback, writer.uint32(/* id 312, wireType 2 =*/2498).fork()).ldelim();
            if (message.ref != null && message.hasOwnProperty("ref"))
                writer.uint32(/* id 1000, wireType 2 =*/8002).string(message.ref);
            return writer;
        };

        /**
         * Encodes the specified Command message, length delimited. Does not implicitly {@link api.Command.verify|verify} messages.
         * @function encodeDelimited
         * @memberof api.Command
         * @static
         * @param {api.ICommand} message Command message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Command.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Command message from the specified reader or buffer.
         * @function decode
         * @memberof api.Command
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {api.Command} Command
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Command.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.api.Command();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.channel = reader.int32();
                    break;
                case 2:
                    message.session = reader.int32();
                    break;
                case 3:
                    message.openChan = $root.api.OpenChannel.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.openChanRes = $root.api.OpenChannelRes.decode(reader, reader.uint32());
                    break;
                case 5:
                    message.closeChan = $root.api.CloseChannel.decode(reader, reader.uint32());
                    break;
                case 6:
                    message.closeChanRes = $root.api.CloseChannel.decode(reader, reader.uint32());
                    break;
                case 9:
                    message.containerState = $root.api.ContainerState.decode(reader, reader.uint32());
                    break;
                case 10:
                    message.portOpen = $root.api.PortOpen.decode(reader, reader.uint32());
                    break;
                case 11:
                    message.toast = $root.api.Toast.decode(reader, reader.uint32());
                    break;
                case 16:
                    message.runMain = $root.api.RunMain.decode(reader, reader.uint32());
                    break;
                case 17:
                    message.clear = $root.api.Clear.decode(reader, reader.uint32());
                    break;
                case 20:
                    message["eval"] = reader.string();
                    break;
                case 21:
                    message.result = reader.string();
                    break;
                case 22:
                    message.input = reader.string();
                    break;
                case 23:
                    message.output = reader.string();
                    break;
                case 24:
                    message.error = reader.string();
                    break;
                case 26:
                    message.saneTerm = $root.api.SaneTerm.decode(reader, reader.uint32());
                    break;
                case 27:
                    message.resizeTerm = $root.api.ResizeTerm.decode(reader, reader.uint32());
                    break;
                case 28:
                    message.state = reader.int32();
                    break;
                case 30:
                    message.ok = $root.api.OK.decode(reader, reader.uint32());
                    break;
                case 31:
                    message.persist = $root.api.File.decode(reader, reader.uint32());
                    break;
                case 32:
                    message.write = $root.api.File.decode(reader, reader.uint32());
                    break;
                case 33:
                    message.remove = $root.api.File.decode(reader, reader.uint32());
                    break;
                case 34:
                    message.move = $root.api.Move.decode(reader, reader.uint32());
                    break;
                case 39:
                    message.mkdir = $root.api.File.decode(reader, reader.uint32());
                    break;
                case 35:
                    message.read = $root.api.File.decode(reader, reader.uint32());
                    break;
                case 37:
                    message.readdir = $root.api.File.decode(reader, reader.uint32());
                    break;
                case 38:
                    message.files = $root.api.Files.decode(reader, reader.uint32());
                    break;
                case 40:
                    message.file = $root.api.File.decode(reader, reader.uint32());
                    break;
                case 42:
                    message.checkChanges = $root.api.CheckChanges.decode(reader, reader.uint32());
                    break;
                case 43:
                    message.changedFiles = $root.api.Files.decode(reader, reader.uint32());
                    break;
                case 44:
                    message.lintResults = $root.api.LintResults.decode(reader, reader.uint32());
                    break;
                case 70:
                    message.runContainedTest = $root.api.ContainedTest.decode(reader, reader.uint32());
                    break;
                case 71:
                    message.testResult = $root.api.TestResult.decode(reader, reader.uint32());
                    break;
                case 90:
                    message.debuggerStart = reader.string();
                    break;
                case 91:
                    message.debuggerStep = $root.api.RunMain.decode(reader, reader.uint32());
                    break;
                case 92:
                    message.debuggerStatus = $root.api.DebugStatus.decode(reader, reader.uint32());
                    break;
                case 100:
                    message.ensurePackages = $root.api.EnsurePackages.decode(reader, reader.uint32());
                    break;
                case 120:
                    message.ping = $root.api.Ping.decode(reader, reader.uint32());
                    break;
                case 121:
                    message.pong = $root.api.Pong.decode(reader, reader.uint32());
                    break;
                case 122:
                    message.hello = $root.api.Hello.decode(reader, reader.uint32());
                    break;
                case 123:
                    message.goodbye = $root.api.Goodbye.decode(reader, reader.uint32());
                    break;
                case 130:
                    message.hint = $root.api.Hint.decode(reader, reader.uint32());
                    break;
                case 150:
                    message.connect = $root.api.Connect.decode(reader, reader.uint32());
                    break;
                case 151:
                    message.send = $root.api.Send.decode(reader, reader.uint32());
                    break;
                case 152:
                    message.recv = $root.api.Recv.decode(reader, reader.uint32());
                    break;
                case 153:
                    message.disconnect = $root.api.Disconnect.decode(reader, reader.uint32());
                    break;
                case 200:
                    message.fileAuthReq = $root.api.FileAuthReq.decode(reader, reader.uint32());
                    break;
                case 201:
                    message.fileAuthRes = $root.api.FileAuthRes.decode(reader, reader.uint32());
                    break;
                case 202:
                    message.mutliFileAuthRes = $root.api.MultiFileAuthRes.decode(reader, reader.uint32());
                    break;
                case 220:
                    message.ot = $root.api.OTPacket.decode(reader, reader.uint32());
                    break;
                case 221:
                    message.otstatus = $root.api.OTStatus.decode(reader, reader.uint32());
                    break;
                case 222:
                    message.otLinkFile = $root.api.OTLinkFile.decode(reader, reader.uint32());
                    break;
                case 223:
                    message.otNewCursor = $root.api.OTCursor.decode(reader, reader.uint32());
                    break;
                case 224:
                    message.otDeleteCursor = $root.api.OTCursor.decode(reader, reader.uint32());
                    break;
                case 251:
                    message.flush = $root.api.Flush.decode(reader, reader.uint32());
                    break;
                case 230:
                    message.debug = $root.api.Debug.decode(reader, reader.uint32());
                    break;
                case 231:
                    message.startVCR = $root.api.StartVCR.decode(reader, reader.uint32());
                    break;
                case 232:
                    message.readVCR = $root.api.ReadVCR.decode(reader, reader.uint32());
                    break;
                case 233:
                    message.VCRLog = $root.api.VCRLog.decode(reader, reader.uint32());
                    break;
                case 235:
                    message.auth = $root.api.Auth.decode(reader, reader.uint32());
                    break;
                case 240:
                    message.execInfo = $root.api.ExecInfo.decode(reader, reader.uint32());
                    break;
                case 250:
                    message.subscribe = $root.api.File.decode(reader, reader.uint32());
                    break;
                case 252:
                    message.eventCreated = $root.api.File.decode(reader, reader.uint32());
                    break;
                case 253:
                    message.eventModified = $root.api.File.decode(reader, reader.uint32());
                    break;
                case 254:
                    message.eventDeleted = $root.api.File.decode(reader, reader.uint32());
                    break;
                case 255:
                    message.eventMoved = $root.api.Move.decode(reader, reader.uint32());
                    break;
                case 256:
                    message.subscribeFile = $root.api.SubscribeFile.decode(reader, reader.uint32());
                    break;
                case 257:
                    message.fileEvent = $root.api.FileEvent.decode(reader, reader.uint32());
                    break;
                case 260:
                    message.roster = $root.api.Roster.decode(reader, reader.uint32());
                    break;
                case 261:
                    message.join = $root.api.User.decode(reader, reader.uint32());
                    break;
                case 262:
                    message.part = $root.api.User.decode(reader, reader.uint32());
                    break;
                case 270:
                    message.exec = $root.api.Exec.decode(reader, reader.uint32());
                    break;
                case 280:
                    message.packageSearch = $root.api.PackageSearch.decode(reader, reader.uint32());
                    break;
                case 281:
                    message.packageSearchResp = $root.api.PackageSearchResp.decode(reader, reader.uint32());
                    break;
                case 282:
                    message.packageInfo = $root.api.PackageInfo.decode(reader, reader.uint32());
                    break;
                case 283:
                    message.packageInfoResp = $root.api.PackageInfoResp.decode(reader, reader.uint32());
                    break;
                case 284:
                    message.packageAdd = $root.api.PackageAdd.decode(reader, reader.uint32());
                    break;
                case 285:
                    message.packageRemove = $root.api.PackageRemove.decode(reader, reader.uint32());
                    break;
                case 286:
                    message.packageInstall = $root.api.PackageInstall.decode(reader, reader.uint32());
                    break;
                case 287:
                    message.packageListSpecfile = $root.api.PackageListSpecfile.decode(reader, reader.uint32());
                    break;
                case 288:
                    message.packageListSpecfileResp = $root.api.PackageListSpecfileResp.decode(reader, reader.uint32());
                    break;
                case 289:
                    message.packageCacheSave = $root.api.PackageCacheSave.decode(reader, reader.uint32());
                    break;
                case 310:
                    message.chatMessage = $root.api.ChatMessage.decode(reader, reader.uint32());
                    break;
                case 311:
                    message.chatTyping = $root.api.ChatTyping.decode(reader, reader.uint32());
                    break;
                case 312:
                    message.chatScrollback = $root.api.ChatScrollback.decode(reader, reader.uint32());
                    break;
                case 1000:
                    message.ref = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Command message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof api.Command
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {api.Command} Command
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Command.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Command message.
         * @function verify
         * @memberof api.Command
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Command.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            var properties = {};
            if (message.channel != null && message.hasOwnProperty("channel"))
                if (!$util.isInteger(message.channel))
                    return "channel: integer expected";
            if (message.session != null && message.hasOwnProperty("session"))
                if (!$util.isInteger(message.session))
                    return "session: integer expected";
            if (message.openChan != null && message.hasOwnProperty("openChan")) {
                properties.body = 1;
                {
                    var error = $root.api.OpenChannel.verify(message.openChan);
                    if (error)
                        return "openChan." + error;
                }
            }
            if (message.openChanRes != null && message.hasOwnProperty("openChanRes")) {
                if (properties.body === 1)
                    return "body: multiple values";
                properties.body = 1;
                {
                    var error = $root.api.OpenChannelRes.verify(message.openChanRes);
                    if (error)
                        return "openChanRes." + error;
                }
            }
            if (message.closeChan != null && message.hasOwnProperty("closeChan")) {
                if (properties.body === 1)
                    return "body: multiple values";
                properties.body = 1;
                {
                    var error = $root.api.CloseChannel.verify(message.closeChan);
                    if (error)
                        return "closeChan." + error;
                }
            }
            if (message.closeChanRes != null && message.hasOwnProperty("closeChanRes")) {
                if (properties.body === 1)
                    return "body: multiple values";
                properties.body = 1;
                {
                    var error = $root.api.CloseChannel.verify(message.closeChanRes);
                    if (error)
                        return "closeChanRes." + error;
                }
            }
            if (message.containerState != null && message.hasOwnProperty("containerState")) {
                if (properties.body === 1)
                    return "body: multiple values";
                properties.body = 1;
                {
                    var error = $root.api.ContainerState.verify(message.containerState);
                    if (error)
                        return "containerState." + error;
                }
            }
            if (message.portOpen != null && message.hasOwnProperty("portOpen")) {
                if (properties.body === 1)
                    return "body: multiple values";
                properties.body = 1;
                {
                    var error = $root.api.PortOpen.verify(message.portOpen);
                    if (error)
                        return "portOpen." + error;
                }
            }
            if (message.toast != null && message.hasOwnProperty("toast")) {
                if (properties.body === 1)
                    return "body: multiple values";
                properties.body = 1;
                {
                    var error = $root.api.Toast.verify(message.toast);
                    if (error)
                        return "toast." + error;
                }
            }
            if (message.runMain != null && message.hasOwnProperty("runMain")) {
                if (properties.body === 1)
                    return "body: multiple values";
                properties.body = 1;
                {
                    var error = $root.api.RunMain.verify(message.runMain);
                    if (error)
                        return "runMain." + error;
                }
            }
            if (message.clear != null && message.hasOwnProperty("clear")) {
                if (properties.body === 1)
                    return "body: multiple values";
                properties.body = 1;
                {
                    var error = $root.api.Clear.verify(message.clear);
                    if (error)
                        return "clear." + error;
                }
            }
            if (message["eval"] != null && message.hasOwnProperty("eval")) {
                if (properties.body === 1)
                    return "body: multiple values";
                properties.body = 1;
                if (!$util.isString(message["eval"]))
                    return "eval: string expected";
            }
            if (message.result != null && message.hasOwnProperty("result")) {
                if (properties.body === 1)
                    return "body: multiple values";
                properties.body = 1;
                if (!$util.isString(message.result))
                    return "result: string expected";
            }
            if (message.input != null && message.hasOwnProperty("input")) {
                if (properties.body === 1)
                    return "body: multiple values";
                properties.body = 1;
                if (!$util.isString(message.input))
                    return "input: string expected";
            }
            if (message.output != null && message.hasOwnProperty("output")) {
                if (properties.body === 1)
                    return "body: multiple values";
                properties.body = 1;
                if (!$util.isString(message.output))
                    return "output: string expected";
            }
            if (message.error != null && message.hasOwnProperty("error")) {
                if (properties.body === 1)
                    return "body: multiple values";
                properties.body = 1;
                if (!$util.isString(message.error))
                    return "error: string expected";
            }
            if (message.saneTerm != null && message.hasOwnProperty("saneTerm")) {
                if (properties.body === 1)
                    return "body: multiple values";
                properties.body = 1;
                {
                    var error = $root.api.SaneTerm.verify(message.saneTerm);
                    if (error)
                        return "saneTerm." + error;
                }
            }
            if (message.resizeTerm != null && message.hasOwnProperty("resizeTerm")) {
                if (properties.body === 1)
                    return "body: multiple values";
                properties.body = 1;
                {
                    var error = $root.api.ResizeTerm.verify(message.resizeTerm);
                    if (error)
                        return "resizeTerm." + error;
                }
            }
            if (message.state != null && message.hasOwnProperty("state")) {
                if (properties.body === 1)
                    return "body: multiple values";
                properties.body = 1;
                switch (message.state) {
                default:
                    return "state: enum value expected";
                case 0:
                case 1:
                    break;
                }
            }
            if (message.ok != null && message.hasOwnProperty("ok")) {
                if (properties.body === 1)
                    return "body: multiple values";
                properties.body = 1;
                {
                    var error = $root.api.OK.verify(message.ok);
                    if (error)
                        return "ok." + error;
                }
            }
            if (message.persist != null && message.hasOwnProperty("persist")) {
                if (properties.body === 1)
                    return "body: multiple values";
                properties.body = 1;
                {
                    var error = $root.api.File.verify(message.persist);
                    if (error)
                        return "persist." + error;
                }
            }
            if (message.write != null && message.hasOwnProperty("write")) {
                if (properties.body === 1)
                    return "body: multiple values";
                properties.body = 1;
                {
                    var error = $root.api.File.verify(message.write);
                    if (error)
                        return "write." + error;
                }
            }
            if (message.remove != null && message.hasOwnProperty("remove")) {
                if (properties.body === 1)
                    return "body: multiple values";
                properties.body = 1;
                {
                    var error = $root.api.File.verify(message.remove);
                    if (error)
                        return "remove." + error;
                }
            }
            if (message.move != null && message.hasOwnProperty("move")) {
                if (properties.body === 1)
                    return "body: multiple values";
                properties.body = 1;
                {
                    var error = $root.api.Move.verify(message.move);
                    if (error)
                        return "move." + error;
                }
            }
            if (message.mkdir != null && message.hasOwnProperty("mkdir")) {
                if (properties.body === 1)
                    return "body: multiple values";
                properties.body = 1;
                {
                    var error = $root.api.File.verify(message.mkdir);
                    if (error)
                        return "mkdir." + error;
                }
            }
            if (message.read != null && message.hasOwnProperty("read")) {
                if (properties.body === 1)
                    return "body: multiple values";
                properties.body = 1;
                {
                    var error = $root.api.File.verify(message.read);
                    if (error)
                        return "read." + error;
                }
            }
            if (message.readdir != null && message.hasOwnProperty("readdir")) {
                if (properties.body === 1)
                    return "body: multiple values";
                properties.body = 1;
                {
                    var error = $root.api.File.verify(message.readdir);
                    if (error)
                        return "readdir." + error;
                }
            }
            if (message.files != null && message.hasOwnProperty("files")) {
                if (properties.body === 1)
                    return "body: multiple values";
                properties.body = 1;
                {
                    var error = $root.api.Files.verify(message.files);
                    if (error)
                        return "files." + error;
                }
            }
            if (message.file != null && message.hasOwnProperty("file")) {
                if (properties.body === 1)
                    return "body: multiple values";
                properties.body = 1;
                {
                    var error = $root.api.File.verify(message.file);
                    if (error)
                        return "file." + error;
                }
            }
            if (message.checkChanges != null && message.hasOwnProperty("checkChanges")) {
                if (properties.body === 1)
                    return "body: multiple values";
                properties.body = 1;
                {
                    var error = $root.api.CheckChanges.verify(message.checkChanges);
                    if (error)
                        return "checkChanges." + error;
                }
            }
            if (message.changedFiles != null && message.hasOwnProperty("changedFiles")) {
                if (properties.body === 1)
                    return "body: multiple values";
                properties.body = 1;
                {
                    var error = $root.api.Files.verify(message.changedFiles);
                    if (error)
                        return "changedFiles." + error;
                }
            }
            if (message.lintResults != null && message.hasOwnProperty("lintResults")) {
                if (properties.body === 1)
                    return "body: multiple values";
                properties.body = 1;
                {
                    var error = $root.api.LintResults.verify(message.lintResults);
                    if (error)
                        return "lintResults." + error;
                }
            }
            if (message.runContainedTest != null && message.hasOwnProperty("runContainedTest")) {
                if (properties.body === 1)
                    return "body: multiple values";
                properties.body = 1;
                {
                    var error = $root.api.ContainedTest.verify(message.runContainedTest);
                    if (error)
                        return "runContainedTest." + error;
                }
            }
            if (message.testResult != null && message.hasOwnProperty("testResult")) {
                if (properties.body === 1)
                    return "body: multiple values";
                properties.body = 1;
                {
                    var error = $root.api.TestResult.verify(message.testResult);
                    if (error)
                        return "testResult." + error;
                }
            }
            if (message.debuggerStart != null && message.hasOwnProperty("debuggerStart")) {
                if (properties.body === 1)
                    return "body: multiple values";
                properties.body = 1;
                if (!$util.isString(message.debuggerStart))
                    return "debuggerStart: string expected";
            }
            if (message.debuggerStep != null && message.hasOwnProperty("debuggerStep")) {
                if (properties.body === 1)
                    return "body: multiple values";
                properties.body = 1;
                {
                    var error = $root.api.RunMain.verify(message.debuggerStep);
                    if (error)
                        return "debuggerStep." + error;
                }
            }
            if (message.debuggerStatus != null && message.hasOwnProperty("debuggerStatus")) {
                if (properties.body === 1)
                    return "body: multiple values";
                properties.body = 1;
                {
                    var error = $root.api.DebugStatus.verify(message.debuggerStatus);
                    if (error)
                        return "debuggerStatus." + error;
                }
            }
            if (message.ensurePackages != null && message.hasOwnProperty("ensurePackages")) {
                if (properties.body === 1)
                    return "body: multiple values";
                properties.body = 1;
                {
                    var error = $root.api.EnsurePackages.verify(message.ensurePackages);
                    if (error)
                        return "ensurePackages." + error;
                }
            }
            if (message.ping != null && message.hasOwnProperty("ping")) {
                if (properties.body === 1)
                    return "body: multiple values";
                properties.body = 1;
                {
                    var error = $root.api.Ping.verify(message.ping);
                    if (error)
                        return "ping." + error;
                }
            }
            if (message.pong != null && message.hasOwnProperty("pong")) {
                if (properties.body === 1)
                    return "body: multiple values";
                properties.body = 1;
                {
                    var error = $root.api.Pong.verify(message.pong);
                    if (error)
                        return "pong." + error;
                }
            }
            if (message.hello != null && message.hasOwnProperty("hello")) {
                if (properties.body === 1)
                    return "body: multiple values";
                properties.body = 1;
                {
                    var error = $root.api.Hello.verify(message.hello);
                    if (error)
                        return "hello." + error;
                }
            }
            if (message.goodbye != null && message.hasOwnProperty("goodbye")) {
                if (properties.body === 1)
                    return "body: multiple values";
                properties.body = 1;
                {
                    var error = $root.api.Goodbye.verify(message.goodbye);
                    if (error)
                        return "goodbye." + error;
                }
            }
            if (message.hint != null && message.hasOwnProperty("hint")) {
                if (properties.body === 1)
                    return "body: multiple values";
                properties.body = 1;
                {
                    var error = $root.api.Hint.verify(message.hint);
                    if (error)
                        return "hint." + error;
                }
            }
            if (message.connect != null && message.hasOwnProperty("connect")) {
                if (properties.body === 1)
                    return "body: multiple values";
                properties.body = 1;
                {
                    var error = $root.api.Connect.verify(message.connect);
                    if (error)
                        return "connect." + error;
                }
            }
            if (message.send != null && message.hasOwnProperty("send")) {
                if (properties.body === 1)
                    return "body: multiple values";
                properties.body = 1;
                {
                    var error = $root.api.Send.verify(message.send);
                    if (error)
                        return "send." + error;
                }
            }
            if (message.recv != null && message.hasOwnProperty("recv")) {
                if (properties.body === 1)
                    return "body: multiple values";
                properties.body = 1;
                {
                    var error = $root.api.Recv.verify(message.recv);
                    if (error)
                        return "recv." + error;
                }
            }
            if (message.disconnect != null && message.hasOwnProperty("disconnect")) {
                if (properties.body === 1)
                    return "body: multiple values";
                properties.body = 1;
                {
                    var error = $root.api.Disconnect.verify(message.disconnect);
                    if (error)
                        return "disconnect." + error;
                }
            }
            if (message.fileAuthReq != null && message.hasOwnProperty("fileAuthReq")) {
                if (properties.body === 1)
                    return "body: multiple values";
                properties.body = 1;
                {
                    var error = $root.api.FileAuthReq.verify(message.fileAuthReq);
                    if (error)
                        return "fileAuthReq." + error;
                }
            }
            if (message.fileAuthRes != null && message.hasOwnProperty("fileAuthRes")) {
                if (properties.body === 1)
                    return "body: multiple values";
                properties.body = 1;
                {
                    var error = $root.api.FileAuthRes.verify(message.fileAuthRes);
                    if (error)
                        return "fileAuthRes." + error;
                }
            }
            if (message.mutliFileAuthRes != null && message.hasOwnProperty("mutliFileAuthRes")) {
                if (properties.body === 1)
                    return "body: multiple values";
                properties.body = 1;
                {
                    var error = $root.api.MultiFileAuthRes.verify(message.mutliFileAuthRes);
                    if (error)
                        return "mutliFileAuthRes." + error;
                }
            }
            if (message.ot != null && message.hasOwnProperty("ot")) {
                if (properties.body === 1)
                    return "body: multiple values";
                properties.body = 1;
                {
                    var error = $root.api.OTPacket.verify(message.ot);
                    if (error)
                        return "ot." + error;
                }
            }
            if (message.otstatus != null && message.hasOwnProperty("otstatus")) {
                if (properties.body === 1)
                    return "body: multiple values";
                properties.body = 1;
                {
                    var error = $root.api.OTStatus.verify(message.otstatus);
                    if (error)
                        return "otstatus." + error;
                }
            }
            if (message.otLinkFile != null && message.hasOwnProperty("otLinkFile")) {
                if (properties.body === 1)
                    return "body: multiple values";
                properties.body = 1;
                {
                    var error = $root.api.OTLinkFile.verify(message.otLinkFile);
                    if (error)
                        return "otLinkFile." + error;
                }
            }
            if (message.otNewCursor != null && message.hasOwnProperty("otNewCursor")) {
                if (properties.body === 1)
                    return "body: multiple values";
                properties.body = 1;
                {
                    var error = $root.api.OTCursor.verify(message.otNewCursor);
                    if (error)
                        return "otNewCursor." + error;
                }
            }
            if (message.otDeleteCursor != null && message.hasOwnProperty("otDeleteCursor")) {
                if (properties.body === 1)
                    return "body: multiple values";
                properties.body = 1;
                {
                    var error = $root.api.OTCursor.verify(message.otDeleteCursor);
                    if (error)
                        return "otDeleteCursor." + error;
                }
            }
            if (message.flush != null && message.hasOwnProperty("flush")) {
                if (properties.body === 1)
                    return "body: multiple values";
                properties.body = 1;
                {
                    var error = $root.api.Flush.verify(message.flush);
                    if (error)
                        return "flush." + error;
                }
            }
            if (message.debug != null && message.hasOwnProperty("debug")) {
                if (properties.body === 1)
                    return "body: multiple values";
                properties.body = 1;
                {
                    var error = $root.api.Debug.verify(message.debug);
                    if (error)
                        return "debug." + error;
                }
            }
            if (message.startVCR != null && message.hasOwnProperty("startVCR")) {
                if (properties.body === 1)
                    return "body: multiple values";
                properties.body = 1;
                {
                    var error = $root.api.StartVCR.verify(message.startVCR);
                    if (error)
                        return "startVCR." + error;
                }
            }
            if (message.readVCR != null && message.hasOwnProperty("readVCR")) {
                if (properties.body === 1)
                    return "body: multiple values";
                properties.body = 1;
                {
                    var error = $root.api.ReadVCR.verify(message.readVCR);
                    if (error)
                        return "readVCR." + error;
                }
            }
            if (message.VCRLog != null && message.hasOwnProperty("VCRLog")) {
                if (properties.body === 1)
                    return "body: multiple values";
                properties.body = 1;
                {
                    var error = $root.api.VCRLog.verify(message.VCRLog);
                    if (error)
                        return "VCRLog." + error;
                }
            }
            if (message.auth != null && message.hasOwnProperty("auth")) {
                if (properties.body === 1)
                    return "body: multiple values";
                properties.body = 1;
                {
                    var error = $root.api.Auth.verify(message.auth);
                    if (error)
                        return "auth." + error;
                }
            }
            if (message.execInfo != null && message.hasOwnProperty("execInfo")) {
                if (properties.body === 1)
                    return "body: multiple values";
                properties.body = 1;
                {
                    var error = $root.api.ExecInfo.verify(message.execInfo);
                    if (error)
                        return "execInfo." + error;
                }
            }
            if (message.subscribe != null && message.hasOwnProperty("subscribe")) {
                if (properties.body === 1)
                    return "body: multiple values";
                properties.body = 1;
                {
                    var error = $root.api.File.verify(message.subscribe);
                    if (error)
                        return "subscribe." + error;
                }
            }
            if (message.eventCreated != null && message.hasOwnProperty("eventCreated")) {
                if (properties.body === 1)
                    return "body: multiple values";
                properties.body = 1;
                {
                    var error = $root.api.File.verify(message.eventCreated);
                    if (error)
                        return "eventCreated." + error;
                }
            }
            if (message.eventModified != null && message.hasOwnProperty("eventModified")) {
                if (properties.body === 1)
                    return "body: multiple values";
                properties.body = 1;
                {
                    var error = $root.api.File.verify(message.eventModified);
                    if (error)
                        return "eventModified." + error;
                }
            }
            if (message.eventDeleted != null && message.hasOwnProperty("eventDeleted")) {
                if (properties.body === 1)
                    return "body: multiple values";
                properties.body = 1;
                {
                    var error = $root.api.File.verify(message.eventDeleted);
                    if (error)
                        return "eventDeleted." + error;
                }
            }
            if (message.eventMoved != null && message.hasOwnProperty("eventMoved")) {
                if (properties.body === 1)
                    return "body: multiple values";
                properties.body = 1;
                {
                    var error = $root.api.Move.verify(message.eventMoved);
                    if (error)
                        return "eventMoved." + error;
                }
            }
            if (message.subscribeFile != null && message.hasOwnProperty("subscribeFile")) {
                if (properties.body === 1)
                    return "body: multiple values";
                properties.body = 1;
                {
                    var error = $root.api.SubscribeFile.verify(message.subscribeFile);
                    if (error)
                        return "subscribeFile." + error;
                }
            }
            if (message.fileEvent != null && message.hasOwnProperty("fileEvent")) {
                if (properties.body === 1)
                    return "body: multiple values";
                properties.body = 1;
                {
                    var error = $root.api.FileEvent.verify(message.fileEvent);
                    if (error)
                        return "fileEvent." + error;
                }
            }
            if (message.roster != null && message.hasOwnProperty("roster")) {
                if (properties.body === 1)
                    return "body: multiple values";
                properties.body = 1;
                {
                    var error = $root.api.Roster.verify(message.roster);
                    if (error)
                        return "roster." + error;
                }
            }
            if (message.join != null && message.hasOwnProperty("join")) {
                if (properties.body === 1)
                    return "body: multiple values";
                properties.body = 1;
                {
                    var error = $root.api.User.verify(message.join);
                    if (error)
                        return "join." + error;
                }
            }
            if (message.part != null && message.hasOwnProperty("part")) {
                if (properties.body === 1)
                    return "body: multiple values";
                properties.body = 1;
                {
                    var error = $root.api.User.verify(message.part);
                    if (error)
                        return "part." + error;
                }
            }
            if (message.exec != null && message.hasOwnProperty("exec")) {
                if (properties.body === 1)
                    return "body: multiple values";
                properties.body = 1;
                {
                    var error = $root.api.Exec.verify(message.exec);
                    if (error)
                        return "exec." + error;
                }
            }
            if (message.packageSearch != null && message.hasOwnProperty("packageSearch")) {
                if (properties.body === 1)
                    return "body: multiple values";
                properties.body = 1;
                {
                    var error = $root.api.PackageSearch.verify(message.packageSearch);
                    if (error)
                        return "packageSearch." + error;
                }
            }
            if (message.packageSearchResp != null && message.hasOwnProperty("packageSearchResp")) {
                if (properties.body === 1)
                    return "body: multiple values";
                properties.body = 1;
                {
                    var error = $root.api.PackageSearchResp.verify(message.packageSearchResp);
                    if (error)
                        return "packageSearchResp." + error;
                }
            }
            if (message.packageInfo != null && message.hasOwnProperty("packageInfo")) {
                if (properties.body === 1)
                    return "body: multiple values";
                properties.body = 1;
                {
                    var error = $root.api.PackageInfo.verify(message.packageInfo);
                    if (error)
                        return "packageInfo." + error;
                }
            }
            if (message.packageInfoResp != null && message.hasOwnProperty("packageInfoResp")) {
                if (properties.body === 1)
                    return "body: multiple values";
                properties.body = 1;
                {
                    var error = $root.api.PackageInfoResp.verify(message.packageInfoResp);
                    if (error)
                        return "packageInfoResp." + error;
                }
            }
            if (message.packageAdd != null && message.hasOwnProperty("packageAdd")) {
                if (properties.body === 1)
                    return "body: multiple values";
                properties.body = 1;
                {
                    var error = $root.api.PackageAdd.verify(message.packageAdd);
                    if (error)
                        return "packageAdd." + error;
                }
            }
            if (message.packageRemove != null && message.hasOwnProperty("packageRemove")) {
                if (properties.body === 1)
                    return "body: multiple values";
                properties.body = 1;
                {
                    var error = $root.api.PackageRemove.verify(message.packageRemove);
                    if (error)
                        return "packageRemove." + error;
                }
            }
            if (message.packageInstall != null && message.hasOwnProperty("packageInstall")) {
                if (properties.body === 1)
                    return "body: multiple values";
                properties.body = 1;
                {
                    var error = $root.api.PackageInstall.verify(message.packageInstall);
                    if (error)
                        return "packageInstall." + error;
                }
            }
            if (message.packageListSpecfile != null && message.hasOwnProperty("packageListSpecfile")) {
                if (properties.body === 1)
                    return "body: multiple values";
                properties.body = 1;
                {
                    var error = $root.api.PackageListSpecfile.verify(message.packageListSpecfile);
                    if (error)
                        return "packageListSpecfile." + error;
                }
            }
            if (message.packageListSpecfileResp != null && message.hasOwnProperty("packageListSpecfileResp")) {
                if (properties.body === 1)
                    return "body: multiple values";
                properties.body = 1;
                {
                    var error = $root.api.PackageListSpecfileResp.verify(message.packageListSpecfileResp);
                    if (error)
                        return "packageListSpecfileResp." + error;
                }
            }
            if (message.packageCacheSave != null && message.hasOwnProperty("packageCacheSave")) {
                if (properties.body === 1)
                    return "body: multiple values";
                properties.body = 1;
                {
                    var error = $root.api.PackageCacheSave.verify(message.packageCacheSave);
                    if (error)
                        return "packageCacheSave." + error;
                }
            }
            if (message.chatMessage != null && message.hasOwnProperty("chatMessage")) {
                if (properties.body === 1)
                    return "body: multiple values";
                properties.body = 1;
                {
                    var error = $root.api.ChatMessage.verify(message.chatMessage);
                    if (error)
                        return "chatMessage." + error;
                }
            }
            if (message.chatTyping != null && message.hasOwnProperty("chatTyping")) {
                if (properties.body === 1)
                    return "body: multiple values";
                properties.body = 1;
                {
                    var error = $root.api.ChatTyping.verify(message.chatTyping);
                    if (error)
                        return "chatTyping." + error;
                }
            }
            if (message.chatScrollback != null && message.hasOwnProperty("chatScrollback")) {
                if (properties.body === 1)
                    return "body: multiple values";
                properties.body = 1;
                {
                    var error = $root.api.ChatScrollback.verify(message.chatScrollback);
                    if (error)
                        return "chatScrollback." + error;
                }
            }
            if (message.ref != null && message.hasOwnProperty("ref"))
                if (!$util.isString(message.ref))
                    return "ref: string expected";
            return null;
        };

        /**
         * Creates a Command message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof api.Command
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {api.Command} Command
         */
        Command.fromObject = function fromObject(object) {
            if (object instanceof $root.api.Command)
                return object;
            var message = new $root.api.Command();
            if (object.channel != null)
                message.channel = object.channel | 0;
            if (object.session != null)
                message.session = object.session | 0;
            if (object.openChan != null) {
                if (typeof object.openChan !== "object")
                    throw TypeError(".api.Command.openChan: object expected");
                message.openChan = $root.api.OpenChannel.fromObject(object.openChan);
            }
            if (object.openChanRes != null) {
                if (typeof object.openChanRes !== "object")
                    throw TypeError(".api.Command.openChanRes: object expected");
                message.openChanRes = $root.api.OpenChannelRes.fromObject(object.openChanRes);
            }
            if (object.closeChan != null) {
                if (typeof object.closeChan !== "object")
                    throw TypeError(".api.Command.closeChan: object expected");
                message.closeChan = $root.api.CloseChannel.fromObject(object.closeChan);
            }
            if (object.closeChanRes != null) {
                if (typeof object.closeChanRes !== "object")
                    throw TypeError(".api.Command.closeChanRes: object expected");
                message.closeChanRes = $root.api.CloseChannel.fromObject(object.closeChanRes);
            }
            if (object.containerState != null) {
                if (typeof object.containerState !== "object")
                    throw TypeError(".api.Command.containerState: object expected");
                message.containerState = $root.api.ContainerState.fromObject(object.containerState);
            }
            if (object.portOpen != null) {
                if (typeof object.portOpen !== "object")
                    throw TypeError(".api.Command.portOpen: object expected");
                message.portOpen = $root.api.PortOpen.fromObject(object.portOpen);
            }
            if (object.toast != null) {
                if (typeof object.toast !== "object")
                    throw TypeError(".api.Command.toast: object expected");
                message.toast = $root.api.Toast.fromObject(object.toast);
            }
            if (object.runMain != null) {
                if (typeof object.runMain !== "object")
                    throw TypeError(".api.Command.runMain: object expected");
                message.runMain = $root.api.RunMain.fromObject(object.runMain);
            }
            if (object.clear != null) {
                if (typeof object.clear !== "object")
                    throw TypeError(".api.Command.clear: object expected");
                message.clear = $root.api.Clear.fromObject(object.clear);
            }
            if (object["eval"] != null)
                message["eval"] = String(object["eval"]);
            if (object.result != null)
                message.result = String(object.result);
            if (object.input != null)
                message.input = String(object.input);
            if (object.output != null)
                message.output = String(object.output);
            if (object.error != null)
                message.error = String(object.error);
            if (object.saneTerm != null) {
                if (typeof object.saneTerm !== "object")
                    throw TypeError(".api.Command.saneTerm: object expected");
                message.saneTerm = $root.api.SaneTerm.fromObject(object.saneTerm);
            }
            if (object.resizeTerm != null) {
                if (typeof object.resizeTerm !== "object")
                    throw TypeError(".api.Command.resizeTerm: object expected");
                message.resizeTerm = $root.api.ResizeTerm.fromObject(object.resizeTerm);
            }
            switch (object.state) {
            case "Stopped":
            case 0:
                message.state = 0;
                break;
            case "Running":
            case 1:
                message.state = 1;
                break;
            }
            if (object.ok != null) {
                if (typeof object.ok !== "object")
                    throw TypeError(".api.Command.ok: object expected");
                message.ok = $root.api.OK.fromObject(object.ok);
            }
            if (object.persist != null) {
                if (typeof object.persist !== "object")
                    throw TypeError(".api.Command.persist: object expected");
                message.persist = $root.api.File.fromObject(object.persist);
            }
            if (object.write != null) {
                if (typeof object.write !== "object")
                    throw TypeError(".api.Command.write: object expected");
                message.write = $root.api.File.fromObject(object.write);
            }
            if (object.remove != null) {
                if (typeof object.remove !== "object")
                    throw TypeError(".api.Command.remove: object expected");
                message.remove = $root.api.File.fromObject(object.remove);
            }
            if (object.move != null) {
                if (typeof object.move !== "object")
                    throw TypeError(".api.Command.move: object expected");
                message.move = $root.api.Move.fromObject(object.move);
            }
            if (object.mkdir != null) {
                if (typeof object.mkdir !== "object")
                    throw TypeError(".api.Command.mkdir: object expected");
                message.mkdir = $root.api.File.fromObject(object.mkdir);
            }
            if (object.read != null) {
                if (typeof object.read !== "object")
                    throw TypeError(".api.Command.read: object expected");
                message.read = $root.api.File.fromObject(object.read);
            }
            if (object.readdir != null) {
                if (typeof object.readdir !== "object")
                    throw TypeError(".api.Command.readdir: object expected");
                message.readdir = $root.api.File.fromObject(object.readdir);
            }
            if (object.files != null) {
                if (typeof object.files !== "object")
                    throw TypeError(".api.Command.files: object expected");
                message.files = $root.api.Files.fromObject(object.files);
            }
            if (object.file != null) {
                if (typeof object.file !== "object")
                    throw TypeError(".api.Command.file: object expected");
                message.file = $root.api.File.fromObject(object.file);
            }
            if (object.checkChanges != null) {
                if (typeof object.checkChanges !== "object")
                    throw TypeError(".api.Command.checkChanges: object expected");
                message.checkChanges = $root.api.CheckChanges.fromObject(object.checkChanges);
            }
            if (object.changedFiles != null) {
                if (typeof object.changedFiles !== "object")
                    throw TypeError(".api.Command.changedFiles: object expected");
                message.changedFiles = $root.api.Files.fromObject(object.changedFiles);
            }
            if (object.lintResults != null) {
                if (typeof object.lintResults !== "object")
                    throw TypeError(".api.Command.lintResults: object expected");
                message.lintResults = $root.api.LintResults.fromObject(object.lintResults);
            }
            if (object.runContainedTest != null) {
                if (typeof object.runContainedTest !== "object")
                    throw TypeError(".api.Command.runContainedTest: object expected");
                message.runContainedTest = $root.api.ContainedTest.fromObject(object.runContainedTest);
            }
            if (object.testResult != null) {
                if (typeof object.testResult !== "object")
                    throw TypeError(".api.Command.testResult: object expected");
                message.testResult = $root.api.TestResult.fromObject(object.testResult);
            }
            if (object.debuggerStart != null)
                message.debuggerStart = String(object.debuggerStart);
            if (object.debuggerStep != null) {
                if (typeof object.debuggerStep !== "object")
                    throw TypeError(".api.Command.debuggerStep: object expected");
                message.debuggerStep = $root.api.RunMain.fromObject(object.debuggerStep);
            }
            if (object.debuggerStatus != null) {
                if (typeof object.debuggerStatus !== "object")
                    throw TypeError(".api.Command.debuggerStatus: object expected");
                message.debuggerStatus = $root.api.DebugStatus.fromObject(object.debuggerStatus);
            }
            if (object.ensurePackages != null) {
                if (typeof object.ensurePackages !== "object")
                    throw TypeError(".api.Command.ensurePackages: object expected");
                message.ensurePackages = $root.api.EnsurePackages.fromObject(object.ensurePackages);
            }
            if (object.ping != null) {
                if (typeof object.ping !== "object")
                    throw TypeError(".api.Command.ping: object expected");
                message.ping = $root.api.Ping.fromObject(object.ping);
            }
            if (object.pong != null) {
                if (typeof object.pong !== "object")
                    throw TypeError(".api.Command.pong: object expected");
                message.pong = $root.api.Pong.fromObject(object.pong);
            }
            if (object.hello != null) {
                if (typeof object.hello !== "object")
                    throw TypeError(".api.Command.hello: object expected");
                message.hello = $root.api.Hello.fromObject(object.hello);
            }
            if (object.goodbye != null) {
                if (typeof object.goodbye !== "object")
                    throw TypeError(".api.Command.goodbye: object expected");
                message.goodbye = $root.api.Goodbye.fromObject(object.goodbye);
            }
            if (object.hint != null) {
                if (typeof object.hint !== "object")
                    throw TypeError(".api.Command.hint: object expected");
                message.hint = $root.api.Hint.fromObject(object.hint);
            }
            if (object.connect != null) {
                if (typeof object.connect !== "object")
                    throw TypeError(".api.Command.connect: object expected");
                message.connect = $root.api.Connect.fromObject(object.connect);
            }
            if (object.send != null) {
                if (typeof object.send !== "object")
                    throw TypeError(".api.Command.send: object expected");
                message.send = $root.api.Send.fromObject(object.send);
            }
            if (object.recv != null) {
                if (typeof object.recv !== "object")
                    throw TypeError(".api.Command.recv: object expected");
                message.recv = $root.api.Recv.fromObject(object.recv);
            }
            if (object.disconnect != null) {
                if (typeof object.disconnect !== "object")
                    throw TypeError(".api.Command.disconnect: object expected");
                message.disconnect = $root.api.Disconnect.fromObject(object.disconnect);
            }
            if (object.fileAuthReq != null) {
                if (typeof object.fileAuthReq !== "object")
                    throw TypeError(".api.Command.fileAuthReq: object expected");
                message.fileAuthReq = $root.api.FileAuthReq.fromObject(object.fileAuthReq);
            }
            if (object.fileAuthRes != null) {
                if (typeof object.fileAuthRes !== "object")
                    throw TypeError(".api.Command.fileAuthRes: object expected");
                message.fileAuthRes = $root.api.FileAuthRes.fromObject(object.fileAuthRes);
            }
            if (object.mutliFileAuthRes != null) {
                if (typeof object.mutliFileAuthRes !== "object")
                    throw TypeError(".api.Command.mutliFileAuthRes: object expected");
                message.mutliFileAuthRes = $root.api.MultiFileAuthRes.fromObject(object.mutliFileAuthRes);
            }
            if (object.ot != null) {
                if (typeof object.ot !== "object")
                    throw TypeError(".api.Command.ot: object expected");
                message.ot = $root.api.OTPacket.fromObject(object.ot);
            }
            if (object.otstatus != null) {
                if (typeof object.otstatus !== "object")
                    throw TypeError(".api.Command.otstatus: object expected");
                message.otstatus = $root.api.OTStatus.fromObject(object.otstatus);
            }
            if (object.otLinkFile != null) {
                if (typeof object.otLinkFile !== "object")
                    throw TypeError(".api.Command.otLinkFile: object expected");
                message.otLinkFile = $root.api.OTLinkFile.fromObject(object.otLinkFile);
            }
            if (object.otNewCursor != null) {
                if (typeof object.otNewCursor !== "object")
                    throw TypeError(".api.Command.otNewCursor: object expected");
                message.otNewCursor = $root.api.OTCursor.fromObject(object.otNewCursor);
            }
            if (object.otDeleteCursor != null) {
                if (typeof object.otDeleteCursor !== "object")
                    throw TypeError(".api.Command.otDeleteCursor: object expected");
                message.otDeleteCursor = $root.api.OTCursor.fromObject(object.otDeleteCursor);
            }
            if (object.flush != null) {
                if (typeof object.flush !== "object")
                    throw TypeError(".api.Command.flush: object expected");
                message.flush = $root.api.Flush.fromObject(object.flush);
            }
            if (object.debug != null) {
                if (typeof object.debug !== "object")
                    throw TypeError(".api.Command.debug: object expected");
                message.debug = $root.api.Debug.fromObject(object.debug);
            }
            if (object.startVCR != null) {
                if (typeof object.startVCR !== "object")
                    throw TypeError(".api.Command.startVCR: object expected");
                message.startVCR = $root.api.StartVCR.fromObject(object.startVCR);
            }
            if (object.readVCR != null) {
                if (typeof object.readVCR !== "object")
                    throw TypeError(".api.Command.readVCR: object expected");
                message.readVCR = $root.api.ReadVCR.fromObject(object.readVCR);
            }
            if (object.VCRLog != null) {
                if (typeof object.VCRLog !== "object")
                    throw TypeError(".api.Command.VCRLog: object expected");
                message.VCRLog = $root.api.VCRLog.fromObject(object.VCRLog);
            }
            if (object.auth != null) {
                if (typeof object.auth !== "object")
                    throw TypeError(".api.Command.auth: object expected");
                message.auth = $root.api.Auth.fromObject(object.auth);
            }
            if (object.execInfo != null) {
                if (typeof object.execInfo !== "object")
                    throw TypeError(".api.Command.execInfo: object expected");
                message.execInfo = $root.api.ExecInfo.fromObject(object.execInfo);
            }
            if (object.subscribe != null) {
                if (typeof object.subscribe !== "object")
                    throw TypeError(".api.Command.subscribe: object expected");
                message.subscribe = $root.api.File.fromObject(object.subscribe);
            }
            if (object.eventCreated != null) {
                if (typeof object.eventCreated !== "object")
                    throw TypeError(".api.Command.eventCreated: object expected");
                message.eventCreated = $root.api.File.fromObject(object.eventCreated);
            }
            if (object.eventModified != null) {
                if (typeof object.eventModified !== "object")
                    throw TypeError(".api.Command.eventModified: object expected");
                message.eventModified = $root.api.File.fromObject(object.eventModified);
            }
            if (object.eventDeleted != null) {
                if (typeof object.eventDeleted !== "object")
                    throw TypeError(".api.Command.eventDeleted: object expected");
                message.eventDeleted = $root.api.File.fromObject(object.eventDeleted);
            }
            if (object.eventMoved != null) {
                if (typeof object.eventMoved !== "object")
                    throw TypeError(".api.Command.eventMoved: object expected");
                message.eventMoved = $root.api.Move.fromObject(object.eventMoved);
            }
            if (object.subscribeFile != null) {
                if (typeof object.subscribeFile !== "object")
                    throw TypeError(".api.Command.subscribeFile: object expected");
                message.subscribeFile = $root.api.SubscribeFile.fromObject(object.subscribeFile);
            }
            if (object.fileEvent != null) {
                if (typeof object.fileEvent !== "object")
                    throw TypeError(".api.Command.fileEvent: object expected");
                message.fileEvent = $root.api.FileEvent.fromObject(object.fileEvent);
            }
            if (object.roster != null) {
                if (typeof object.roster !== "object")
                    throw TypeError(".api.Command.roster: object expected");
                message.roster = $root.api.Roster.fromObject(object.roster);
            }
            if (object.join != null) {
                if (typeof object.join !== "object")
                    throw TypeError(".api.Command.join: object expected");
                message.join = $root.api.User.fromObject(object.join);
            }
            if (object.part != null) {
                if (typeof object.part !== "object")
                    throw TypeError(".api.Command.part: object expected");
                message.part = $root.api.User.fromObject(object.part);
            }
            if (object.exec != null) {
                if (typeof object.exec !== "object")
                    throw TypeError(".api.Command.exec: object expected");
                message.exec = $root.api.Exec.fromObject(object.exec);
            }
            if (object.packageSearch != null) {
                if (typeof object.packageSearch !== "object")
                    throw TypeError(".api.Command.packageSearch: object expected");
                message.packageSearch = $root.api.PackageSearch.fromObject(object.packageSearch);
            }
            if (object.packageSearchResp != null) {
                if (typeof object.packageSearchResp !== "object")
                    throw TypeError(".api.Command.packageSearchResp: object expected");
                message.packageSearchResp = $root.api.PackageSearchResp.fromObject(object.packageSearchResp);
            }
            if (object.packageInfo != null) {
                if (typeof object.packageInfo !== "object")
                    throw TypeError(".api.Command.packageInfo: object expected");
                message.packageInfo = $root.api.PackageInfo.fromObject(object.packageInfo);
            }
            if (object.packageInfoResp != null) {
                if (typeof object.packageInfoResp !== "object")
                    throw TypeError(".api.Command.packageInfoResp: object expected");
                message.packageInfoResp = $root.api.PackageInfoResp.fromObject(object.packageInfoResp);
            }
            if (object.packageAdd != null) {
                if (typeof object.packageAdd !== "object")
                    throw TypeError(".api.Command.packageAdd: object expected");
                message.packageAdd = $root.api.PackageAdd.fromObject(object.packageAdd);
            }
            if (object.packageRemove != null) {
                if (typeof object.packageRemove !== "object")
                    throw TypeError(".api.Command.packageRemove: object expected");
                message.packageRemove = $root.api.PackageRemove.fromObject(object.packageRemove);
            }
            if (object.packageInstall != null) {
                if (typeof object.packageInstall !== "object")
                    throw TypeError(".api.Command.packageInstall: object expected");
                message.packageInstall = $root.api.PackageInstall.fromObject(object.packageInstall);
            }
            if (object.packageListSpecfile != null) {
                if (typeof object.packageListSpecfile !== "object")
                    throw TypeError(".api.Command.packageListSpecfile: object expected");
                message.packageListSpecfile = $root.api.PackageListSpecfile.fromObject(object.packageListSpecfile);
            }
            if (object.packageListSpecfileResp != null) {
                if (typeof object.packageListSpecfileResp !== "object")
                    throw TypeError(".api.Command.packageListSpecfileResp: object expected");
                message.packageListSpecfileResp = $root.api.PackageListSpecfileResp.fromObject(object.packageListSpecfileResp);
            }
            if (object.packageCacheSave != null) {
                if (typeof object.packageCacheSave !== "object")
                    throw TypeError(".api.Command.packageCacheSave: object expected");
                message.packageCacheSave = $root.api.PackageCacheSave.fromObject(object.packageCacheSave);
            }
            if (object.chatMessage != null) {
                if (typeof object.chatMessage !== "object")
                    throw TypeError(".api.Command.chatMessage: object expected");
                message.chatMessage = $root.api.ChatMessage.fromObject(object.chatMessage);
            }
            if (object.chatTyping != null) {
                if (typeof object.chatTyping !== "object")
                    throw TypeError(".api.Command.chatTyping: object expected");
                message.chatTyping = $root.api.ChatTyping.fromObject(object.chatTyping);
            }
            if (object.chatScrollback != null) {
                if (typeof object.chatScrollback !== "object")
                    throw TypeError(".api.Command.chatScrollback: object expected");
                message.chatScrollback = $root.api.ChatScrollback.fromObject(object.chatScrollback);
            }
            if (object.ref != null)
                message.ref = String(object.ref);
            return message;
        };

        /**
         * Creates a plain object from a Command message. Also converts values to other types if specified.
         * @function toObject
         * @memberof api.Command
         * @static
         * @param {api.Command} message Command
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Command.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.channel = 0;
                object.session = 0;
                object.ref = "";
            }
            if (message.channel != null && message.hasOwnProperty("channel"))
                object.channel = message.channel;
            if (message.session != null && message.hasOwnProperty("session"))
                object.session = message.session;
            if (message.openChan != null && message.hasOwnProperty("openChan")) {
                object.openChan = $root.api.OpenChannel.toObject(message.openChan, options);
                if (options.oneofs)
                    object.body = "openChan";
            }
            if (message.openChanRes != null && message.hasOwnProperty("openChanRes")) {
                object.openChanRes = $root.api.OpenChannelRes.toObject(message.openChanRes, options);
                if (options.oneofs)
                    object.body = "openChanRes";
            }
            if (message.closeChan != null && message.hasOwnProperty("closeChan")) {
                object.closeChan = $root.api.CloseChannel.toObject(message.closeChan, options);
                if (options.oneofs)
                    object.body = "closeChan";
            }
            if (message.closeChanRes != null && message.hasOwnProperty("closeChanRes")) {
                object.closeChanRes = $root.api.CloseChannel.toObject(message.closeChanRes, options);
                if (options.oneofs)
                    object.body = "closeChanRes";
            }
            if (message.containerState != null && message.hasOwnProperty("containerState")) {
                object.containerState = $root.api.ContainerState.toObject(message.containerState, options);
                if (options.oneofs)
                    object.body = "containerState";
            }
            if (message.portOpen != null && message.hasOwnProperty("portOpen")) {
                object.portOpen = $root.api.PortOpen.toObject(message.portOpen, options);
                if (options.oneofs)
                    object.body = "portOpen";
            }
            if (message.toast != null && message.hasOwnProperty("toast")) {
                object.toast = $root.api.Toast.toObject(message.toast, options);
                if (options.oneofs)
                    object.body = "toast";
            }
            if (message.runMain != null && message.hasOwnProperty("runMain")) {
                object.runMain = $root.api.RunMain.toObject(message.runMain, options);
                if (options.oneofs)
                    object.body = "runMain";
            }
            if (message.clear != null && message.hasOwnProperty("clear")) {
                object.clear = $root.api.Clear.toObject(message.clear, options);
                if (options.oneofs)
                    object.body = "clear";
            }
            if (message["eval"] != null && message.hasOwnProperty("eval")) {
                object["eval"] = message["eval"];
                if (options.oneofs)
                    object.body = "eval";
            }
            if (message.result != null && message.hasOwnProperty("result")) {
                object.result = message.result;
                if (options.oneofs)
                    object.body = "result";
            }
            if (message.input != null && message.hasOwnProperty("input")) {
                object.input = message.input;
                if (options.oneofs)
                    object.body = "input";
            }
            if (message.output != null && message.hasOwnProperty("output")) {
                object.output = message.output;
                if (options.oneofs)
                    object.body = "output";
            }
            if (message.error != null && message.hasOwnProperty("error")) {
                object.error = message.error;
                if (options.oneofs)
                    object.body = "error";
            }
            if (message.saneTerm != null && message.hasOwnProperty("saneTerm")) {
                object.saneTerm = $root.api.SaneTerm.toObject(message.saneTerm, options);
                if (options.oneofs)
                    object.body = "saneTerm";
            }
            if (message.resizeTerm != null && message.hasOwnProperty("resizeTerm")) {
                object.resizeTerm = $root.api.ResizeTerm.toObject(message.resizeTerm, options);
                if (options.oneofs)
                    object.body = "resizeTerm";
            }
            if (message.state != null && message.hasOwnProperty("state")) {
                object.state = options.enums === String ? $root.api.State[message.state] : message.state;
                if (options.oneofs)
                    object.body = "state";
            }
            if (message.ok != null && message.hasOwnProperty("ok")) {
                object.ok = $root.api.OK.toObject(message.ok, options);
                if (options.oneofs)
                    object.body = "ok";
            }
            if (message.persist != null && message.hasOwnProperty("persist")) {
                object.persist = $root.api.File.toObject(message.persist, options);
                if (options.oneofs)
                    object.body = "persist";
            }
            if (message.write != null && message.hasOwnProperty("write")) {
                object.write = $root.api.File.toObject(message.write, options);
                if (options.oneofs)
                    object.body = "write";
            }
            if (message.remove != null && message.hasOwnProperty("remove")) {
                object.remove = $root.api.File.toObject(message.remove, options);
                if (options.oneofs)
                    object.body = "remove";
            }
            if (message.move != null && message.hasOwnProperty("move")) {
                object.move = $root.api.Move.toObject(message.move, options);
                if (options.oneofs)
                    object.body = "move";
            }
            if (message.read != null && message.hasOwnProperty("read")) {
                object.read = $root.api.File.toObject(message.read, options);
                if (options.oneofs)
                    object.body = "read";
            }
            if (message.readdir != null && message.hasOwnProperty("readdir")) {
                object.readdir = $root.api.File.toObject(message.readdir, options);
                if (options.oneofs)
                    object.body = "readdir";
            }
            if (message.files != null && message.hasOwnProperty("files")) {
                object.files = $root.api.Files.toObject(message.files, options);
                if (options.oneofs)
                    object.body = "files";
            }
            if (message.mkdir != null && message.hasOwnProperty("mkdir")) {
                object.mkdir = $root.api.File.toObject(message.mkdir, options);
                if (options.oneofs)
                    object.body = "mkdir";
            }
            if (message.file != null && message.hasOwnProperty("file")) {
                object.file = $root.api.File.toObject(message.file, options);
                if (options.oneofs)
                    object.body = "file";
            }
            if (message.checkChanges != null && message.hasOwnProperty("checkChanges")) {
                object.checkChanges = $root.api.CheckChanges.toObject(message.checkChanges, options);
                if (options.oneofs)
                    object.body = "checkChanges";
            }
            if (message.changedFiles != null && message.hasOwnProperty("changedFiles")) {
                object.changedFiles = $root.api.Files.toObject(message.changedFiles, options);
                if (options.oneofs)
                    object.body = "changedFiles";
            }
            if (message.lintResults != null && message.hasOwnProperty("lintResults")) {
                object.lintResults = $root.api.LintResults.toObject(message.lintResults, options);
                if (options.oneofs)
                    object.body = "lintResults";
            }
            if (message.runContainedTest != null && message.hasOwnProperty("runContainedTest")) {
                object.runContainedTest = $root.api.ContainedTest.toObject(message.runContainedTest, options);
                if (options.oneofs)
                    object.body = "runContainedTest";
            }
            if (message.testResult != null && message.hasOwnProperty("testResult")) {
                object.testResult = $root.api.TestResult.toObject(message.testResult, options);
                if (options.oneofs)
                    object.body = "testResult";
            }
            if (message.debuggerStart != null && message.hasOwnProperty("debuggerStart")) {
                object.debuggerStart = message.debuggerStart;
                if (options.oneofs)
                    object.body = "debuggerStart";
            }
            if (message.debuggerStep != null && message.hasOwnProperty("debuggerStep")) {
                object.debuggerStep = $root.api.RunMain.toObject(message.debuggerStep, options);
                if (options.oneofs)
                    object.body = "debuggerStep";
            }
            if (message.debuggerStatus != null && message.hasOwnProperty("debuggerStatus")) {
                object.debuggerStatus = $root.api.DebugStatus.toObject(message.debuggerStatus, options);
                if (options.oneofs)
                    object.body = "debuggerStatus";
            }
            if (message.ensurePackages != null && message.hasOwnProperty("ensurePackages")) {
                object.ensurePackages = $root.api.EnsurePackages.toObject(message.ensurePackages, options);
                if (options.oneofs)
                    object.body = "ensurePackages";
            }
            if (message.ping != null && message.hasOwnProperty("ping")) {
                object.ping = $root.api.Ping.toObject(message.ping, options);
                if (options.oneofs)
                    object.body = "ping";
            }
            if (message.pong != null && message.hasOwnProperty("pong")) {
                object.pong = $root.api.Pong.toObject(message.pong, options);
                if (options.oneofs)
                    object.body = "pong";
            }
            if (message.hello != null && message.hasOwnProperty("hello")) {
                object.hello = $root.api.Hello.toObject(message.hello, options);
                if (options.oneofs)
                    object.body = "hello";
            }
            if (message.goodbye != null && message.hasOwnProperty("goodbye")) {
                object.goodbye = $root.api.Goodbye.toObject(message.goodbye, options);
                if (options.oneofs)
                    object.body = "goodbye";
            }
            if (message.hint != null && message.hasOwnProperty("hint")) {
                object.hint = $root.api.Hint.toObject(message.hint, options);
                if (options.oneofs)
                    object.body = "hint";
            }
            if (message.connect != null && message.hasOwnProperty("connect")) {
                object.connect = $root.api.Connect.toObject(message.connect, options);
                if (options.oneofs)
                    object.body = "connect";
            }
            if (message.send != null && message.hasOwnProperty("send")) {
                object.send = $root.api.Send.toObject(message.send, options);
                if (options.oneofs)
                    object.body = "send";
            }
            if (message.recv != null && message.hasOwnProperty("recv")) {
                object.recv = $root.api.Recv.toObject(message.recv, options);
                if (options.oneofs)
                    object.body = "recv";
            }
            if (message.disconnect != null && message.hasOwnProperty("disconnect")) {
                object.disconnect = $root.api.Disconnect.toObject(message.disconnect, options);
                if (options.oneofs)
                    object.body = "disconnect";
            }
            if (message.fileAuthReq != null && message.hasOwnProperty("fileAuthReq")) {
                object.fileAuthReq = $root.api.FileAuthReq.toObject(message.fileAuthReq, options);
                if (options.oneofs)
                    object.body = "fileAuthReq";
            }
            if (message.fileAuthRes != null && message.hasOwnProperty("fileAuthRes")) {
                object.fileAuthRes = $root.api.FileAuthRes.toObject(message.fileAuthRes, options);
                if (options.oneofs)
                    object.body = "fileAuthRes";
            }
            if (message.mutliFileAuthRes != null && message.hasOwnProperty("mutliFileAuthRes")) {
                object.mutliFileAuthRes = $root.api.MultiFileAuthRes.toObject(message.mutliFileAuthRes, options);
                if (options.oneofs)
                    object.body = "mutliFileAuthRes";
            }
            if (message.ot != null && message.hasOwnProperty("ot")) {
                object.ot = $root.api.OTPacket.toObject(message.ot, options);
                if (options.oneofs)
                    object.body = "ot";
            }
            if (message.otstatus != null && message.hasOwnProperty("otstatus")) {
                object.otstatus = $root.api.OTStatus.toObject(message.otstatus, options);
                if (options.oneofs)
                    object.body = "otstatus";
            }
            if (message.otLinkFile != null && message.hasOwnProperty("otLinkFile")) {
                object.otLinkFile = $root.api.OTLinkFile.toObject(message.otLinkFile, options);
                if (options.oneofs)
                    object.body = "otLinkFile";
            }
            if (message.otNewCursor != null && message.hasOwnProperty("otNewCursor")) {
                object.otNewCursor = $root.api.OTCursor.toObject(message.otNewCursor, options);
                if (options.oneofs)
                    object.body = "otNewCursor";
            }
            if (message.otDeleteCursor != null && message.hasOwnProperty("otDeleteCursor")) {
                object.otDeleteCursor = $root.api.OTCursor.toObject(message.otDeleteCursor, options);
                if (options.oneofs)
                    object.body = "otDeleteCursor";
            }
            if (message.debug != null && message.hasOwnProperty("debug")) {
                object.debug = $root.api.Debug.toObject(message.debug, options);
                if (options.oneofs)
                    object.body = "debug";
            }
            if (message.startVCR != null && message.hasOwnProperty("startVCR")) {
                object.startVCR = $root.api.StartVCR.toObject(message.startVCR, options);
                if (options.oneofs)
                    object.body = "startVCR";
            }
            if (message.readVCR != null && message.hasOwnProperty("readVCR")) {
                object.readVCR = $root.api.ReadVCR.toObject(message.readVCR, options);
                if (options.oneofs)
                    object.body = "readVCR";
            }
            if (message.VCRLog != null && message.hasOwnProperty("VCRLog")) {
                object.VCRLog = $root.api.VCRLog.toObject(message.VCRLog, options);
                if (options.oneofs)
                    object.body = "VCRLog";
            }
            if (message.auth != null && message.hasOwnProperty("auth")) {
                object.auth = $root.api.Auth.toObject(message.auth, options);
                if (options.oneofs)
                    object.body = "auth";
            }
            if (message.execInfo != null && message.hasOwnProperty("execInfo")) {
                object.execInfo = $root.api.ExecInfo.toObject(message.execInfo, options);
                if (options.oneofs)
                    object.body = "execInfo";
            }
            if (message.subscribe != null && message.hasOwnProperty("subscribe")) {
                object.subscribe = $root.api.File.toObject(message.subscribe, options);
                if (options.oneofs)
                    object.body = "subscribe";
            }
            if (message.flush != null && message.hasOwnProperty("flush")) {
                object.flush = $root.api.Flush.toObject(message.flush, options);
                if (options.oneofs)
                    object.body = "flush";
            }
            if (message.eventCreated != null && message.hasOwnProperty("eventCreated")) {
                object.eventCreated = $root.api.File.toObject(message.eventCreated, options);
                if (options.oneofs)
                    object.body = "eventCreated";
            }
            if (message.eventModified != null && message.hasOwnProperty("eventModified")) {
                object.eventModified = $root.api.File.toObject(message.eventModified, options);
                if (options.oneofs)
                    object.body = "eventModified";
            }
            if (message.eventDeleted != null && message.hasOwnProperty("eventDeleted")) {
                object.eventDeleted = $root.api.File.toObject(message.eventDeleted, options);
                if (options.oneofs)
                    object.body = "eventDeleted";
            }
            if (message.eventMoved != null && message.hasOwnProperty("eventMoved")) {
                object.eventMoved = $root.api.Move.toObject(message.eventMoved, options);
                if (options.oneofs)
                    object.body = "eventMoved";
            }
            if (message.subscribeFile != null && message.hasOwnProperty("subscribeFile")) {
                object.subscribeFile = $root.api.SubscribeFile.toObject(message.subscribeFile, options);
                if (options.oneofs)
                    object.body = "subscribeFile";
            }
            if (message.fileEvent != null && message.hasOwnProperty("fileEvent")) {
                object.fileEvent = $root.api.FileEvent.toObject(message.fileEvent, options);
                if (options.oneofs)
                    object.body = "fileEvent";
            }
            if (message.roster != null && message.hasOwnProperty("roster")) {
                object.roster = $root.api.Roster.toObject(message.roster, options);
                if (options.oneofs)
                    object.body = "roster";
            }
            if (message.join != null && message.hasOwnProperty("join")) {
                object.join = $root.api.User.toObject(message.join, options);
                if (options.oneofs)
                    object.body = "join";
            }
            if (message.part != null && message.hasOwnProperty("part")) {
                object.part = $root.api.User.toObject(message.part, options);
                if (options.oneofs)
                    object.body = "part";
            }
            if (message.exec != null && message.hasOwnProperty("exec")) {
                object.exec = $root.api.Exec.toObject(message.exec, options);
                if (options.oneofs)
                    object.body = "exec";
            }
            if (message.packageSearch != null && message.hasOwnProperty("packageSearch")) {
                object.packageSearch = $root.api.PackageSearch.toObject(message.packageSearch, options);
                if (options.oneofs)
                    object.body = "packageSearch";
            }
            if (message.packageSearchResp != null && message.hasOwnProperty("packageSearchResp")) {
                object.packageSearchResp = $root.api.PackageSearchResp.toObject(message.packageSearchResp, options);
                if (options.oneofs)
                    object.body = "packageSearchResp";
            }
            if (message.packageInfo != null && message.hasOwnProperty("packageInfo")) {
                object.packageInfo = $root.api.PackageInfo.toObject(message.packageInfo, options);
                if (options.oneofs)
                    object.body = "packageInfo";
            }
            if (message.packageInfoResp != null && message.hasOwnProperty("packageInfoResp")) {
                object.packageInfoResp = $root.api.PackageInfoResp.toObject(message.packageInfoResp, options);
                if (options.oneofs)
                    object.body = "packageInfoResp";
            }
            if (message.packageAdd != null && message.hasOwnProperty("packageAdd")) {
                object.packageAdd = $root.api.PackageAdd.toObject(message.packageAdd, options);
                if (options.oneofs)
                    object.body = "packageAdd";
            }
            if (message.packageRemove != null && message.hasOwnProperty("packageRemove")) {
                object.packageRemove = $root.api.PackageRemove.toObject(message.packageRemove, options);
                if (options.oneofs)
                    object.body = "packageRemove";
            }
            if (message.packageInstall != null && message.hasOwnProperty("packageInstall")) {
                object.packageInstall = $root.api.PackageInstall.toObject(message.packageInstall, options);
                if (options.oneofs)
                    object.body = "packageInstall";
            }
            if (message.packageListSpecfile != null && message.hasOwnProperty("packageListSpecfile")) {
                object.packageListSpecfile = $root.api.PackageListSpecfile.toObject(message.packageListSpecfile, options);
                if (options.oneofs)
                    object.body = "packageListSpecfile";
            }
            if (message.packageListSpecfileResp != null && message.hasOwnProperty("packageListSpecfileResp")) {
                object.packageListSpecfileResp = $root.api.PackageListSpecfileResp.toObject(message.packageListSpecfileResp, options);
                if (options.oneofs)
                    object.body = "packageListSpecfileResp";
            }
            if (message.packageCacheSave != null && message.hasOwnProperty("packageCacheSave")) {
                object.packageCacheSave = $root.api.PackageCacheSave.toObject(message.packageCacheSave, options);
                if (options.oneofs)
                    object.body = "packageCacheSave";
            }
            if (message.chatMessage != null && message.hasOwnProperty("chatMessage")) {
                object.chatMessage = $root.api.ChatMessage.toObject(message.chatMessage, options);
                if (options.oneofs)
                    object.body = "chatMessage";
            }
            if (message.chatTyping != null && message.hasOwnProperty("chatTyping")) {
                object.chatTyping = $root.api.ChatTyping.toObject(message.chatTyping, options);
                if (options.oneofs)
                    object.body = "chatTyping";
            }
            if (message.chatScrollback != null && message.hasOwnProperty("chatScrollback")) {
                object.chatScrollback = $root.api.ChatScrollback.toObject(message.chatScrollback, options);
                if (options.oneofs)
                    object.body = "chatScrollback";
            }
            if (message.ref != null && message.hasOwnProperty("ref"))
                object.ref = message.ref;
            return object;
        };

        /**
         * Converts this Command to JSON.
         * @function toJSON
         * @memberof api.Command
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Command.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Command;
    })();

    api.SubscribeFile = (function() {

        /**
         * Properties of a SubscribeFile.
         * @memberof api
         * @interface ISubscribeFile
         * @property {Array.<api.IFile>|null} [files] SubscribeFile files
         */

        /**
         * Constructs a new SubscribeFile.
         * @memberof api
         * @classdesc Represents a SubscribeFile.
         * @implements ISubscribeFile
         * @constructor
         * @param {api.ISubscribeFile=} [properties] Properties to set
         */
        function SubscribeFile(properties) {
            this.files = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SubscribeFile files.
         * @member {Array.<api.IFile>} files
         * @memberof api.SubscribeFile
         * @instance
         */
        SubscribeFile.prototype.files = $util.emptyArray;

        /**
         * Creates a new SubscribeFile instance using the specified properties.
         * @function create
         * @memberof api.SubscribeFile
         * @static
         * @param {api.ISubscribeFile=} [properties] Properties to set
         * @returns {api.SubscribeFile} SubscribeFile instance
         */
        SubscribeFile.create = function create(properties) {
            return new SubscribeFile(properties);
        };

        /**
         * Encodes the specified SubscribeFile message. Does not implicitly {@link api.SubscribeFile.verify|verify} messages.
         * @function encode
         * @memberof api.SubscribeFile
         * @static
         * @param {api.ISubscribeFile} message SubscribeFile message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SubscribeFile.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.files != null && message.files.length)
                for (var i = 0; i < message.files.length; ++i)
                    $root.api.File.encode(message.files[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified SubscribeFile message, length delimited. Does not implicitly {@link api.SubscribeFile.verify|verify} messages.
         * @function encodeDelimited
         * @memberof api.SubscribeFile
         * @static
         * @param {api.ISubscribeFile} message SubscribeFile message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SubscribeFile.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SubscribeFile message from the specified reader or buffer.
         * @function decode
         * @memberof api.SubscribeFile
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {api.SubscribeFile} SubscribeFile
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SubscribeFile.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.api.SubscribeFile();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.files && message.files.length))
                        message.files = [];
                    message.files.push($root.api.File.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a SubscribeFile message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof api.SubscribeFile
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {api.SubscribeFile} SubscribeFile
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SubscribeFile.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SubscribeFile message.
         * @function verify
         * @memberof api.SubscribeFile
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SubscribeFile.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.files != null && message.hasOwnProperty("files")) {
                if (!Array.isArray(message.files))
                    return "files: array expected";
                for (var i = 0; i < message.files.length; ++i) {
                    var error = $root.api.File.verify(message.files[i]);
                    if (error)
                        return "files." + error;
                }
            }
            return null;
        };

        /**
         * Creates a SubscribeFile message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof api.SubscribeFile
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {api.SubscribeFile} SubscribeFile
         */
        SubscribeFile.fromObject = function fromObject(object) {
            if (object instanceof $root.api.SubscribeFile)
                return object;
            var message = new $root.api.SubscribeFile();
            if (object.files) {
                if (!Array.isArray(object.files))
                    throw TypeError(".api.SubscribeFile.files: array expected");
                message.files = [];
                for (var i = 0; i < object.files.length; ++i) {
                    if (typeof object.files[i] !== "object")
                        throw TypeError(".api.SubscribeFile.files: object expected");
                    message.files[i] = $root.api.File.fromObject(object.files[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a SubscribeFile message. Also converts values to other types if specified.
         * @function toObject
         * @memberof api.SubscribeFile
         * @static
         * @param {api.SubscribeFile} message SubscribeFile
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SubscribeFile.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.files = [];
            if (message.files && message.files.length) {
                object.files = [];
                for (var j = 0; j < message.files.length; ++j)
                    object.files[j] = $root.api.File.toObject(message.files[j], options);
            }
            return object;
        };

        /**
         * Converts this SubscribeFile to JSON.
         * @function toJSON
         * @memberof api.SubscribeFile
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SubscribeFile.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return SubscribeFile;
    })();

    api.FileEvent = (function() {

        /**
         * Properties of a FileEvent.
         * @memberof api
         * @interface IFileEvent
         * @property {api.IFile|null} [file] FileEvent file
         * @property {api.IFile|null} [dest] FileEvent dest
         * @property {api.FileEvent.Op|null} [op] FileEvent op
         */

        /**
         * Constructs a new FileEvent.
         * @memberof api
         * @classdesc Represents a FileEvent.
         * @implements IFileEvent
         * @constructor
         * @param {api.IFileEvent=} [properties] Properties to set
         */
        function FileEvent(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * FileEvent file.
         * @member {api.IFile|null|undefined} file
         * @memberof api.FileEvent
         * @instance
         */
        FileEvent.prototype.file = null;

        /**
         * FileEvent dest.
         * @member {api.IFile|null|undefined} dest
         * @memberof api.FileEvent
         * @instance
         */
        FileEvent.prototype.dest = null;

        /**
         * FileEvent op.
         * @member {api.FileEvent.Op} op
         * @memberof api.FileEvent
         * @instance
         */
        FileEvent.prototype.op = 0;

        /**
         * Creates a new FileEvent instance using the specified properties.
         * @function create
         * @memberof api.FileEvent
         * @static
         * @param {api.IFileEvent=} [properties] Properties to set
         * @returns {api.FileEvent} FileEvent instance
         */
        FileEvent.create = function create(properties) {
            return new FileEvent(properties);
        };

        /**
         * Encodes the specified FileEvent message. Does not implicitly {@link api.FileEvent.verify|verify} messages.
         * @function encode
         * @memberof api.FileEvent
         * @static
         * @param {api.IFileEvent} message FileEvent message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        FileEvent.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.file != null && message.hasOwnProperty("file"))
                $root.api.File.encode(message.file, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.op != null && message.hasOwnProperty("op"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.op);
            if (message.dest != null && message.hasOwnProperty("dest"))
                $root.api.File.encode(message.dest, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified FileEvent message, length delimited. Does not implicitly {@link api.FileEvent.verify|verify} messages.
         * @function encodeDelimited
         * @memberof api.FileEvent
         * @static
         * @param {api.IFileEvent} message FileEvent message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        FileEvent.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a FileEvent message from the specified reader or buffer.
         * @function decode
         * @memberof api.FileEvent
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {api.FileEvent} FileEvent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        FileEvent.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.api.FileEvent();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.file = $root.api.File.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.dest = $root.api.File.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.op = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a FileEvent message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof api.FileEvent
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {api.FileEvent} FileEvent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        FileEvent.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a FileEvent message.
         * @function verify
         * @memberof api.FileEvent
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        FileEvent.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.file != null && message.hasOwnProperty("file")) {
                var error = $root.api.File.verify(message.file);
                if (error)
                    return "file." + error;
            }
            if (message.dest != null && message.hasOwnProperty("dest")) {
                var error = $root.api.File.verify(message.dest);
                if (error)
                    return "dest." + error;
            }
            if (message.op != null && message.hasOwnProperty("op"))
                switch (message.op) {
                default:
                    return "op: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                    break;
                }
            return null;
        };

        /**
         * Creates a FileEvent message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof api.FileEvent
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {api.FileEvent} FileEvent
         */
        FileEvent.fromObject = function fromObject(object) {
            if (object instanceof $root.api.FileEvent)
                return object;
            var message = new $root.api.FileEvent();
            if (object.file != null) {
                if (typeof object.file !== "object")
                    throw TypeError(".api.FileEvent.file: object expected");
                message.file = $root.api.File.fromObject(object.file);
            }
            if (object.dest != null) {
                if (typeof object.dest !== "object")
                    throw TypeError(".api.FileEvent.dest: object expected");
                message.dest = $root.api.File.fromObject(object.dest);
            }
            switch (object.op) {
            case "Create":
            case 0:
                message.op = 0;
                break;
            case "Move":
            case 1:
                message.op = 1;
                break;
            case "Remove":
            case 2:
                message.op = 2;
                break;
            case "Modify":
            case 3:
                message.op = 3;
                break;
            }
            return message;
        };

        /**
         * Creates a plain object from a FileEvent message. Also converts values to other types if specified.
         * @function toObject
         * @memberof api.FileEvent
         * @static
         * @param {api.FileEvent} message FileEvent
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        FileEvent.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.file = null;
                object.op = options.enums === String ? "Create" : 0;
                object.dest = null;
            }
            if (message.file != null && message.hasOwnProperty("file"))
                object.file = $root.api.File.toObject(message.file, options);
            if (message.op != null && message.hasOwnProperty("op"))
                object.op = options.enums === String ? $root.api.FileEvent.Op[message.op] : message.op;
            if (message.dest != null && message.hasOwnProperty("dest"))
                object.dest = $root.api.File.toObject(message.dest, options);
            return object;
        };

        /**
         * Converts this FileEvent to JSON.
         * @function toJSON
         * @memberof api.FileEvent
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        FileEvent.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Op enum.
         * @name api.FileEvent.Op
         * @enum {string}
         * @property {number} Create=0 Create value
         * @property {number} Move=1 Move value
         * @property {number} Remove=2 Remove value
         * @property {number} Modify=3 Modify value
         */
        FileEvent.Op = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "Create"] = 0;
            values[valuesById[1] = "Move"] = 1;
            values[valuesById[2] = "Remove"] = 2;
            values[valuesById[3] = "Modify"] = 3;
            return values;
        })();

        return FileEvent;
    })();

    api.Flush = (function() {

        /**
         * Properties of a Flush.
         * @memberof api
         * @interface IFlush
         */

        /**
         * Constructs a new Flush.
         * @memberof api
         * @classdesc Represents a Flush.
         * @implements IFlush
         * @constructor
         * @param {api.IFlush=} [properties] Properties to set
         */
        function Flush(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new Flush instance using the specified properties.
         * @function create
         * @memberof api.Flush
         * @static
         * @param {api.IFlush=} [properties] Properties to set
         * @returns {api.Flush} Flush instance
         */
        Flush.create = function create(properties) {
            return new Flush(properties);
        };

        /**
         * Encodes the specified Flush message. Does not implicitly {@link api.Flush.verify|verify} messages.
         * @function encode
         * @memberof api.Flush
         * @static
         * @param {api.IFlush} message Flush message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Flush.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified Flush message, length delimited. Does not implicitly {@link api.Flush.verify|verify} messages.
         * @function encodeDelimited
         * @memberof api.Flush
         * @static
         * @param {api.IFlush} message Flush message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Flush.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Flush message from the specified reader or buffer.
         * @function decode
         * @memberof api.Flush
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {api.Flush} Flush
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Flush.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.api.Flush();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Flush message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof api.Flush
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {api.Flush} Flush
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Flush.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Flush message.
         * @function verify
         * @memberof api.Flush
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Flush.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a Flush message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof api.Flush
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {api.Flush} Flush
         */
        Flush.fromObject = function fromObject(object) {
            if (object instanceof $root.api.Flush)
                return object;
            return new $root.api.Flush();
        };

        /**
         * Creates a plain object from a Flush message. Also converts values to other types if specified.
         * @function toObject
         * @memberof api.Flush
         * @static
         * @param {api.Flush} message Flush
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Flush.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this Flush to JSON.
         * @function toJSON
         * @memberof api.Flush
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Flush.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Flush;
    })();

    api.OTLinkFile = (function() {

        /**
         * Properties of a OTLinkFile.
         * @memberof api
         * @interface IOTLinkFile
         * @property {api.IFile|null} [file] OTLinkFile file
         */

        /**
         * Constructs a new OTLinkFile.
         * @memberof api
         * @classdesc Represents a OTLinkFile.
         * @implements IOTLinkFile
         * @constructor
         * @param {api.IOTLinkFile=} [properties] Properties to set
         */
        function OTLinkFile(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * OTLinkFile file.
         * @member {api.IFile|null|undefined} file
         * @memberof api.OTLinkFile
         * @instance
         */
        OTLinkFile.prototype.file = null;

        /**
         * Creates a new OTLinkFile instance using the specified properties.
         * @function create
         * @memberof api.OTLinkFile
         * @static
         * @param {api.IOTLinkFile=} [properties] Properties to set
         * @returns {api.OTLinkFile} OTLinkFile instance
         */
        OTLinkFile.create = function create(properties) {
            return new OTLinkFile(properties);
        };

        /**
         * Encodes the specified OTLinkFile message. Does not implicitly {@link api.OTLinkFile.verify|verify} messages.
         * @function encode
         * @memberof api.OTLinkFile
         * @static
         * @param {api.IOTLinkFile} message OTLinkFile message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        OTLinkFile.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.file != null && message.hasOwnProperty("file"))
                $root.api.File.encode(message.file, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified OTLinkFile message, length delimited. Does not implicitly {@link api.OTLinkFile.verify|verify} messages.
         * @function encodeDelimited
         * @memberof api.OTLinkFile
         * @static
         * @param {api.IOTLinkFile} message OTLinkFile message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        OTLinkFile.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a OTLinkFile message from the specified reader or buffer.
         * @function decode
         * @memberof api.OTLinkFile
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {api.OTLinkFile} OTLinkFile
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        OTLinkFile.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.api.OTLinkFile();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.file = $root.api.File.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a OTLinkFile message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof api.OTLinkFile
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {api.OTLinkFile} OTLinkFile
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        OTLinkFile.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a OTLinkFile message.
         * @function verify
         * @memberof api.OTLinkFile
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        OTLinkFile.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.file != null && message.hasOwnProperty("file")) {
                var error = $root.api.File.verify(message.file);
                if (error)
                    return "file." + error;
            }
            return null;
        };

        /**
         * Creates a OTLinkFile message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof api.OTLinkFile
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {api.OTLinkFile} OTLinkFile
         */
        OTLinkFile.fromObject = function fromObject(object) {
            if (object instanceof $root.api.OTLinkFile)
                return object;
            var message = new $root.api.OTLinkFile();
            if (object.file != null) {
                if (typeof object.file !== "object")
                    throw TypeError(".api.OTLinkFile.file: object expected");
                message.file = $root.api.File.fromObject(object.file);
            }
            return message;
        };

        /**
         * Creates a plain object from a OTLinkFile message. Also converts values to other types if specified.
         * @function toObject
         * @memberof api.OTLinkFile
         * @static
         * @param {api.OTLinkFile} message OTLinkFile
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        OTLinkFile.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.file = null;
            if (message.file != null && message.hasOwnProperty("file"))
                object.file = $root.api.File.toObject(message.file, options);
            return object;
        };

        /**
         * Converts this OTLinkFile to JSON.
         * @function toJSON
         * @memberof api.OTLinkFile
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        OTLinkFile.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return OTLinkFile;
    })();

    api.Auth = (function() {

        /**
         * Properties of an Auth.
         * @memberof api
         * @interface IAuth
         * @property {string|null} [token] Auth token
         * @property {string|null} [containerID] Auth containerID
         */

        /**
         * Constructs a new Auth.
         * @memberof api
         * @classdesc Represents an Auth.
         * @implements IAuth
         * @constructor
         * @param {api.IAuth=} [properties] Properties to set
         */
        function Auth(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Auth token.
         * @member {string} token
         * @memberof api.Auth
         * @instance
         */
        Auth.prototype.token = "";

        /**
         * Auth containerID.
         * @member {string} containerID
         * @memberof api.Auth
         * @instance
         */
        Auth.prototype.containerID = "";

        /**
         * Creates a new Auth instance using the specified properties.
         * @function create
         * @memberof api.Auth
         * @static
         * @param {api.IAuth=} [properties] Properties to set
         * @returns {api.Auth} Auth instance
         */
        Auth.create = function create(properties) {
            return new Auth(properties);
        };

        /**
         * Encodes the specified Auth message. Does not implicitly {@link api.Auth.verify|verify} messages.
         * @function encode
         * @memberof api.Auth
         * @static
         * @param {api.IAuth} message Auth message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Auth.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.token != null && message.hasOwnProperty("token"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.token);
            if (message.containerID != null && message.hasOwnProperty("containerID"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.containerID);
            return writer;
        };

        /**
         * Encodes the specified Auth message, length delimited. Does not implicitly {@link api.Auth.verify|verify} messages.
         * @function encodeDelimited
         * @memberof api.Auth
         * @static
         * @param {api.IAuth} message Auth message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Auth.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an Auth message from the specified reader or buffer.
         * @function decode
         * @memberof api.Auth
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {api.Auth} Auth
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Auth.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.api.Auth();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.token = reader.string();
                    break;
                case 2:
                    message.containerID = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an Auth message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof api.Auth
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {api.Auth} Auth
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Auth.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an Auth message.
         * @function verify
         * @memberof api.Auth
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Auth.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.token != null && message.hasOwnProperty("token"))
                if (!$util.isString(message.token))
                    return "token: string expected";
            if (message.containerID != null && message.hasOwnProperty("containerID"))
                if (!$util.isString(message.containerID))
                    return "containerID: string expected";
            return null;
        };

        /**
         * Creates an Auth message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof api.Auth
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {api.Auth} Auth
         */
        Auth.fromObject = function fromObject(object) {
            if (object instanceof $root.api.Auth)
                return object;
            var message = new $root.api.Auth();
            if (object.token != null)
                message.token = String(object.token);
            if (object.containerID != null)
                message.containerID = String(object.containerID);
            return message;
        };

        /**
         * Creates a plain object from an Auth message. Also converts values to other types if specified.
         * @function toObject
         * @memberof api.Auth
         * @static
         * @param {api.Auth} message Auth
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Auth.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.token = "";
                object.containerID = "";
            }
            if (message.token != null && message.hasOwnProperty("token"))
                object.token = message.token;
            if (message.containerID != null && message.hasOwnProperty("containerID"))
                object.containerID = message.containerID;
            return object;
        };

        /**
         * Converts this Auth to JSON.
         * @function toJSON
         * @memberof api.Auth
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Auth.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Auth;
    })();

    api.VCREntry = (function() {

        /**
         * Properties of a VCREntry.
         * @memberof api
         * @interface IVCREntry
         * @property {number|Long|null} [timestamp] VCREntry timestamp
         * @property {api.VCREntry.Direction|null} [direction] VCREntry direction
         * @property {api.ICommand|null} [command] VCREntry command
         * @property {string|null} [uid] VCREntry uid
         */

        /**
         * Constructs a new VCREntry.
         * @memberof api
         * @classdesc Represents a VCREntry.
         * @implements IVCREntry
         * @constructor
         * @param {api.IVCREntry=} [properties] Properties to set
         */
        function VCREntry(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * VCREntry timestamp.
         * @member {number|Long} timestamp
         * @memberof api.VCREntry
         * @instance
         */
        VCREntry.prototype.timestamp = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * VCREntry direction.
         * @member {api.VCREntry.Direction} direction
         * @memberof api.VCREntry
         * @instance
         */
        VCREntry.prototype.direction = 0;

        /**
         * VCREntry command.
         * @member {api.ICommand|null|undefined} command
         * @memberof api.VCREntry
         * @instance
         */
        VCREntry.prototype.command = null;

        /**
         * VCREntry uid.
         * @member {string} uid
         * @memberof api.VCREntry
         * @instance
         */
        VCREntry.prototype.uid = "";

        /**
         * Creates a new VCREntry instance using the specified properties.
         * @function create
         * @memberof api.VCREntry
         * @static
         * @param {api.IVCREntry=} [properties] Properties to set
         * @returns {api.VCREntry} VCREntry instance
         */
        VCREntry.create = function create(properties) {
            return new VCREntry(properties);
        };

        /**
         * Encodes the specified VCREntry message. Does not implicitly {@link api.VCREntry.verify|verify} messages.
         * @function encode
         * @memberof api.VCREntry
         * @static
         * @param {api.IVCREntry} message VCREntry message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        VCREntry.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.timestamp);
            if (message.direction != null && message.hasOwnProperty("direction"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.direction);
            if (message.command != null && message.hasOwnProperty("command"))
                $root.api.Command.encode(message.command, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.uid != null && message.hasOwnProperty("uid"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.uid);
            return writer;
        };

        /**
         * Encodes the specified VCREntry message, length delimited. Does not implicitly {@link api.VCREntry.verify|verify} messages.
         * @function encodeDelimited
         * @memberof api.VCREntry
         * @static
         * @param {api.IVCREntry} message VCREntry message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        VCREntry.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a VCREntry message from the specified reader or buffer.
         * @function decode
         * @memberof api.VCREntry
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {api.VCREntry} VCREntry
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        VCREntry.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.api.VCREntry();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.timestamp = reader.uint64();
                    break;
                case 2:
                    message.direction = reader.int32();
                    break;
                case 3:
                    message.command = $root.api.Command.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.uid = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a VCREntry message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof api.VCREntry
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {api.VCREntry} VCREntry
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        VCREntry.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a VCREntry message.
         * @function verify
         * @memberof api.VCREntry
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        VCREntry.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                if (!$util.isInteger(message.timestamp) && !(message.timestamp && $util.isInteger(message.timestamp.low) && $util.isInteger(message.timestamp.high)))
                    return "timestamp: integer|Long expected";
            if (message.direction != null && message.hasOwnProperty("direction"))
                switch (message.direction) {
                default:
                    return "direction: enum value expected";
                case 0:
                case 1:
                    break;
                }
            if (message.command != null && message.hasOwnProperty("command")) {
                var error = $root.api.Command.verify(message.command);
                if (error)
                    return "command." + error;
            }
            if (message.uid != null && message.hasOwnProperty("uid"))
                if (!$util.isString(message.uid))
                    return "uid: string expected";
            return null;
        };

        /**
         * Creates a VCREntry message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof api.VCREntry
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {api.VCREntry} VCREntry
         */
        VCREntry.fromObject = function fromObject(object) {
            if (object instanceof $root.api.VCREntry)
                return object;
            var message = new $root.api.VCREntry();
            if (object.timestamp != null)
                if ($util.Long)
                    (message.timestamp = $util.Long.fromValue(object.timestamp)).unsigned = true;
                else if (typeof object.timestamp === "string")
                    message.timestamp = parseInt(object.timestamp, 10);
                else if (typeof object.timestamp === "number")
                    message.timestamp = object.timestamp;
                else if (typeof object.timestamp === "object")
                    message.timestamp = new $util.LongBits(object.timestamp.low >>> 0, object.timestamp.high >>> 0).toNumber(true);
            switch (object.direction) {
            case "IN":
            case 0:
                message.direction = 0;
                break;
            case "OUT":
            case 1:
                message.direction = 1;
                break;
            }
            if (object.command != null) {
                if (typeof object.command !== "object")
                    throw TypeError(".api.VCREntry.command: object expected");
                message.command = $root.api.Command.fromObject(object.command);
            }
            if (object.uid != null)
                message.uid = String(object.uid);
            return message;
        };

        /**
         * Creates a plain object from a VCREntry message. Also converts values to other types if specified.
         * @function toObject
         * @memberof api.VCREntry
         * @static
         * @param {api.VCREntry} message VCREntry
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        VCREntry.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object.timestamp = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.timestamp = options.longs === String ? "0" : 0;
                object.direction = options.enums === String ? "IN" : 0;
                object.command = null;
                object.uid = "";
            }
            if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                if (typeof message.timestamp === "number")
                    object.timestamp = options.longs === String ? String(message.timestamp) : message.timestamp;
                else
                    object.timestamp = options.longs === String ? $util.Long.prototype.toString.call(message.timestamp) : options.longs === Number ? new $util.LongBits(message.timestamp.low >>> 0, message.timestamp.high >>> 0).toNumber(true) : message.timestamp;
            if (message.direction != null && message.hasOwnProperty("direction"))
                object.direction = options.enums === String ? $root.api.VCREntry.Direction[message.direction] : message.direction;
            if (message.command != null && message.hasOwnProperty("command"))
                object.command = $root.api.Command.toObject(message.command, options);
            if (message.uid != null && message.hasOwnProperty("uid"))
                object.uid = message.uid;
            return object;
        };

        /**
         * Converts this VCREntry to JSON.
         * @function toJSON
         * @memberof api.VCREntry
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        VCREntry.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Direction enum.
         * @name api.VCREntry.Direction
         * @enum {string}
         * @property {number} IN=0 IN value
         * @property {number} OUT=1 OUT value
         */
        VCREntry.Direction = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "IN"] = 0;
            values[valuesById[1] = "OUT"] = 1;
            return values;
        })();

        return VCREntry;
    })();

    api.StartVCR = (function() {

        /**
         * Properties of a StartVCR.
         * @memberof api
         * @interface IStartVCR
         */

        /**
         * Constructs a new StartVCR.
         * @memberof api
         * @classdesc Represents a StartVCR.
         * @implements IStartVCR
         * @constructor
         * @param {api.IStartVCR=} [properties] Properties to set
         */
        function StartVCR(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new StartVCR instance using the specified properties.
         * @function create
         * @memberof api.StartVCR
         * @static
         * @param {api.IStartVCR=} [properties] Properties to set
         * @returns {api.StartVCR} StartVCR instance
         */
        StartVCR.create = function create(properties) {
            return new StartVCR(properties);
        };

        /**
         * Encodes the specified StartVCR message. Does not implicitly {@link api.StartVCR.verify|verify} messages.
         * @function encode
         * @memberof api.StartVCR
         * @static
         * @param {api.IStartVCR} message StartVCR message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        StartVCR.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified StartVCR message, length delimited. Does not implicitly {@link api.StartVCR.verify|verify} messages.
         * @function encodeDelimited
         * @memberof api.StartVCR
         * @static
         * @param {api.IStartVCR} message StartVCR message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        StartVCR.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a StartVCR message from the specified reader or buffer.
         * @function decode
         * @memberof api.StartVCR
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {api.StartVCR} StartVCR
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        StartVCR.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.api.StartVCR();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a StartVCR message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof api.StartVCR
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {api.StartVCR} StartVCR
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        StartVCR.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a StartVCR message.
         * @function verify
         * @memberof api.StartVCR
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        StartVCR.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a StartVCR message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof api.StartVCR
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {api.StartVCR} StartVCR
         */
        StartVCR.fromObject = function fromObject(object) {
            if (object instanceof $root.api.StartVCR)
                return object;
            return new $root.api.StartVCR();
        };

        /**
         * Creates a plain object from a StartVCR message. Also converts values to other types if specified.
         * @function toObject
         * @memberof api.StartVCR
         * @static
         * @param {api.StartVCR} message StartVCR
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        StartVCR.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this StartVCR to JSON.
         * @function toJSON
         * @memberof api.StartVCR
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        StartVCR.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return StartVCR;
    })();

    api.ReadVCR = (function() {

        /**
         * Properties of a ReadVCR.
         * @memberof api
         * @interface IReadVCR
         */

        /**
         * Constructs a new ReadVCR.
         * @memberof api
         * @classdesc Represents a ReadVCR.
         * @implements IReadVCR
         * @constructor
         * @param {api.IReadVCR=} [properties] Properties to set
         */
        function ReadVCR(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new ReadVCR instance using the specified properties.
         * @function create
         * @memberof api.ReadVCR
         * @static
         * @param {api.IReadVCR=} [properties] Properties to set
         * @returns {api.ReadVCR} ReadVCR instance
         */
        ReadVCR.create = function create(properties) {
            return new ReadVCR(properties);
        };

        /**
         * Encodes the specified ReadVCR message. Does not implicitly {@link api.ReadVCR.verify|verify} messages.
         * @function encode
         * @memberof api.ReadVCR
         * @static
         * @param {api.IReadVCR} message ReadVCR message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ReadVCR.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified ReadVCR message, length delimited. Does not implicitly {@link api.ReadVCR.verify|verify} messages.
         * @function encodeDelimited
         * @memberof api.ReadVCR
         * @static
         * @param {api.IReadVCR} message ReadVCR message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ReadVCR.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ReadVCR message from the specified reader or buffer.
         * @function decode
         * @memberof api.ReadVCR
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {api.ReadVCR} ReadVCR
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ReadVCR.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.api.ReadVCR();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a ReadVCR message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof api.ReadVCR
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {api.ReadVCR} ReadVCR
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ReadVCR.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ReadVCR message.
         * @function verify
         * @memberof api.ReadVCR
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ReadVCR.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a ReadVCR message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof api.ReadVCR
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {api.ReadVCR} ReadVCR
         */
        ReadVCR.fromObject = function fromObject(object) {
            if (object instanceof $root.api.ReadVCR)
                return object;
            return new $root.api.ReadVCR();
        };

        /**
         * Creates a plain object from a ReadVCR message. Also converts values to other types if specified.
         * @function toObject
         * @memberof api.ReadVCR
         * @static
         * @param {api.ReadVCR} message ReadVCR
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ReadVCR.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this ReadVCR to JSON.
         * @function toJSON
         * @memberof api.ReadVCR
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ReadVCR.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return ReadVCR;
    })();

    api.VCRLog = (function() {

        /**
         * Properties of a VCRLog.
         * @memberof api
         * @interface IVCRLog
         * @property {Array.<api.IVCREntry>|null} [log] VCRLog log
         * @property {api.IFile|null} [logfile] VCRLog logfile
         */

        /**
         * Constructs a new VCRLog.
         * @memberof api
         * @classdesc Represents a VCRLog.
         * @implements IVCRLog
         * @constructor
         * @param {api.IVCRLog=} [properties] Properties to set
         */
        function VCRLog(properties) {
            this.log = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * VCRLog log.
         * @member {Array.<api.IVCREntry>} log
         * @memberof api.VCRLog
         * @instance
         */
        VCRLog.prototype.log = $util.emptyArray;

        /**
         * VCRLog logfile.
         * @member {api.IFile|null|undefined} logfile
         * @memberof api.VCRLog
         * @instance
         */
        VCRLog.prototype.logfile = null;

        /**
         * Creates a new VCRLog instance using the specified properties.
         * @function create
         * @memberof api.VCRLog
         * @static
         * @param {api.IVCRLog=} [properties] Properties to set
         * @returns {api.VCRLog} VCRLog instance
         */
        VCRLog.create = function create(properties) {
            return new VCRLog(properties);
        };

        /**
         * Encodes the specified VCRLog message. Does not implicitly {@link api.VCRLog.verify|verify} messages.
         * @function encode
         * @memberof api.VCRLog
         * @static
         * @param {api.IVCRLog} message VCRLog message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        VCRLog.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.log != null && message.log.length)
                for (var i = 0; i < message.log.length; ++i)
                    $root.api.VCREntry.encode(message.log[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.logfile != null && message.hasOwnProperty("logfile"))
                $root.api.File.encode(message.logfile, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified VCRLog message, length delimited. Does not implicitly {@link api.VCRLog.verify|verify} messages.
         * @function encodeDelimited
         * @memberof api.VCRLog
         * @static
         * @param {api.IVCRLog} message VCRLog message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        VCRLog.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a VCRLog message from the specified reader or buffer.
         * @function decode
         * @memberof api.VCRLog
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {api.VCRLog} VCRLog
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        VCRLog.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.api.VCRLog();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.log && message.log.length))
                        message.log = [];
                    message.log.push($root.api.VCREntry.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.logfile = $root.api.File.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a VCRLog message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof api.VCRLog
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {api.VCRLog} VCRLog
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        VCRLog.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a VCRLog message.
         * @function verify
         * @memberof api.VCRLog
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        VCRLog.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.log != null && message.hasOwnProperty("log")) {
                if (!Array.isArray(message.log))
                    return "log: array expected";
                for (var i = 0; i < message.log.length; ++i) {
                    var error = $root.api.VCREntry.verify(message.log[i]);
                    if (error)
                        return "log." + error;
                }
            }
            if (message.logfile != null && message.hasOwnProperty("logfile")) {
                var error = $root.api.File.verify(message.logfile);
                if (error)
                    return "logfile." + error;
            }
            return null;
        };

        /**
         * Creates a VCRLog message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof api.VCRLog
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {api.VCRLog} VCRLog
         */
        VCRLog.fromObject = function fromObject(object) {
            if (object instanceof $root.api.VCRLog)
                return object;
            var message = new $root.api.VCRLog();
            if (object.log) {
                if (!Array.isArray(object.log))
                    throw TypeError(".api.VCRLog.log: array expected");
                message.log = [];
                for (var i = 0; i < object.log.length; ++i) {
                    if (typeof object.log[i] !== "object")
                        throw TypeError(".api.VCRLog.log: object expected");
                    message.log[i] = $root.api.VCREntry.fromObject(object.log[i]);
                }
            }
            if (object.logfile != null) {
                if (typeof object.logfile !== "object")
                    throw TypeError(".api.VCRLog.logfile: object expected");
                message.logfile = $root.api.File.fromObject(object.logfile);
            }
            return message;
        };

        /**
         * Creates a plain object from a VCRLog message. Also converts values to other types if specified.
         * @function toObject
         * @memberof api.VCRLog
         * @static
         * @param {api.VCRLog} message VCRLog
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        VCRLog.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.log = [];
            if (options.defaults)
                object.logfile = null;
            if (message.log && message.log.length) {
                object.log = [];
                for (var j = 0; j < message.log.length; ++j)
                    object.log[j] = $root.api.VCREntry.toObject(message.log[j], options);
            }
            if (message.logfile != null && message.hasOwnProperty("logfile"))
                object.logfile = $root.api.File.toObject(message.logfile, options);
            return object;
        };

        /**
         * Converts this VCRLog to JSON.
         * @function toJSON
         * @memberof api.VCRLog
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        VCRLog.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return VCRLog;
    })();

    api.ExecInfo = (function() {

        /**
         * Properties of an ExecInfo.
         * @memberof api
         * @interface IExecInfo
         * @property {Array.<string>|null} [command] ExecInfo command
         * @property {string|null} [reason] ExecInfo reason
         */

        /**
         * Constructs a new ExecInfo.
         * @memberof api
         * @classdesc Represents an ExecInfo.
         * @implements IExecInfo
         * @constructor
         * @param {api.IExecInfo=} [properties] Properties to set
         */
        function ExecInfo(properties) {
            this.command = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ExecInfo command.
         * @member {Array.<string>} command
         * @memberof api.ExecInfo
         * @instance
         */
        ExecInfo.prototype.command = $util.emptyArray;

        /**
         * ExecInfo reason.
         * @member {string} reason
         * @memberof api.ExecInfo
         * @instance
         */
        ExecInfo.prototype.reason = "";

        /**
         * Creates a new ExecInfo instance using the specified properties.
         * @function create
         * @memberof api.ExecInfo
         * @static
         * @param {api.IExecInfo=} [properties] Properties to set
         * @returns {api.ExecInfo} ExecInfo instance
         */
        ExecInfo.create = function create(properties) {
            return new ExecInfo(properties);
        };

        /**
         * Encodes the specified ExecInfo message. Does not implicitly {@link api.ExecInfo.verify|verify} messages.
         * @function encode
         * @memberof api.ExecInfo
         * @static
         * @param {api.IExecInfo} message ExecInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ExecInfo.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.command != null && message.command.length)
                for (var i = 0; i < message.command.length; ++i)
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.command[i]);
            if (message.reason != null && message.hasOwnProperty("reason"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.reason);
            return writer;
        };

        /**
         * Encodes the specified ExecInfo message, length delimited. Does not implicitly {@link api.ExecInfo.verify|verify} messages.
         * @function encodeDelimited
         * @memberof api.ExecInfo
         * @static
         * @param {api.IExecInfo} message ExecInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ExecInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an ExecInfo message from the specified reader or buffer.
         * @function decode
         * @memberof api.ExecInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {api.ExecInfo} ExecInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ExecInfo.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.api.ExecInfo();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.command && message.command.length))
                        message.command = [];
                    message.command.push(reader.string());
                    break;
                case 2:
                    message.reason = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an ExecInfo message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof api.ExecInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {api.ExecInfo} ExecInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ExecInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an ExecInfo message.
         * @function verify
         * @memberof api.ExecInfo
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ExecInfo.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.command != null && message.hasOwnProperty("command")) {
                if (!Array.isArray(message.command))
                    return "command: array expected";
                for (var i = 0; i < message.command.length; ++i)
                    if (!$util.isString(message.command[i]))
                        return "command: string[] expected";
            }
            if (message.reason != null && message.hasOwnProperty("reason"))
                if (!$util.isString(message.reason))
                    return "reason: string expected";
            return null;
        };

        /**
         * Creates an ExecInfo message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof api.ExecInfo
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {api.ExecInfo} ExecInfo
         */
        ExecInfo.fromObject = function fromObject(object) {
            if (object instanceof $root.api.ExecInfo)
                return object;
            var message = new $root.api.ExecInfo();
            if (object.command) {
                if (!Array.isArray(object.command))
                    throw TypeError(".api.ExecInfo.command: array expected");
                message.command = [];
                for (var i = 0; i < object.command.length; ++i)
                    message.command[i] = String(object.command[i]);
            }
            if (object.reason != null)
                message.reason = String(object.reason);
            return message;
        };

        /**
         * Creates a plain object from an ExecInfo message. Also converts values to other types if specified.
         * @function toObject
         * @memberof api.ExecInfo
         * @static
         * @param {api.ExecInfo} message ExecInfo
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ExecInfo.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.command = [];
            if (options.defaults)
                object.reason = "";
            if (message.command && message.command.length) {
                object.command = [];
                for (var j = 0; j < message.command.length; ++j)
                    object.command[j] = message.command[j];
            }
            if (message.reason != null && message.hasOwnProperty("reason"))
                object.reason = message.reason;
            return object;
        };

        /**
         * Converts this ExecInfo to JSON.
         * @function toJSON
         * @memberof api.ExecInfo
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ExecInfo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return ExecInfo;
    })();

    api.Debug = (function() {

        /**
         * Properties of a Debug.
         * @memberof api
         * @interface IDebug
         * @property {string|null} [text] Debug text
         */

        /**
         * Constructs a new Debug.
         * @memberof api
         * @classdesc Represents a Debug.
         * @implements IDebug
         * @constructor
         * @param {api.IDebug=} [properties] Properties to set
         */
        function Debug(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Debug text.
         * @member {string} text
         * @memberof api.Debug
         * @instance
         */
        Debug.prototype.text = "";

        /**
         * Creates a new Debug instance using the specified properties.
         * @function create
         * @memberof api.Debug
         * @static
         * @param {api.IDebug=} [properties] Properties to set
         * @returns {api.Debug} Debug instance
         */
        Debug.create = function create(properties) {
            return new Debug(properties);
        };

        /**
         * Encodes the specified Debug message. Does not implicitly {@link api.Debug.verify|verify} messages.
         * @function encode
         * @memberof api.Debug
         * @static
         * @param {api.IDebug} message Debug message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Debug.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.text != null && message.hasOwnProperty("text"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.text);
            return writer;
        };

        /**
         * Encodes the specified Debug message, length delimited. Does not implicitly {@link api.Debug.verify|verify} messages.
         * @function encodeDelimited
         * @memberof api.Debug
         * @static
         * @param {api.IDebug} message Debug message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Debug.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Debug message from the specified reader or buffer.
         * @function decode
         * @memberof api.Debug
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {api.Debug} Debug
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Debug.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.api.Debug();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.text = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Debug message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof api.Debug
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {api.Debug} Debug
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Debug.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Debug message.
         * @function verify
         * @memberof api.Debug
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Debug.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.text != null && message.hasOwnProperty("text"))
                if (!$util.isString(message.text))
                    return "text: string expected";
            return null;
        };

        /**
         * Creates a Debug message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof api.Debug
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {api.Debug} Debug
         */
        Debug.fromObject = function fromObject(object) {
            if (object instanceof $root.api.Debug)
                return object;
            var message = new $root.api.Debug();
            if (object.text != null)
                message.text = String(object.text);
            return message;
        };

        /**
         * Creates a plain object from a Debug message. Also converts values to other types if specified.
         * @function toObject
         * @memberof api.Debug
         * @static
         * @param {api.Debug} message Debug
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Debug.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.text = "";
            if (message.text != null && message.hasOwnProperty("text"))
                object.text = message.text;
            return object;
        };

        /**
         * Converts this Debug to JSON.
         * @function toJSON
         * @memberof api.Debug
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Debug.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Debug;
    })();

    /**
     * FileAuthMethod enum.
     * @name api.FileAuthMethod
     * @enum {string}
     * @property {number} GET=0 GET value
     * @property {number} HEAD=1 HEAD value
     * @property {number} PUT=2 PUT value
     * @property {number} DELETE=3 DELETE value
     */
    api.FileAuthMethod = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "GET"] = 0;
        values[valuesById[1] = "HEAD"] = 1;
        values[valuesById[2] = "PUT"] = 2;
        values[valuesById[3] = "DELETE"] = 3;
        return values;
    })();

    api.FileAuthReq = (function() {

        /**
         * Properties of a FileAuthReq.
         * @memberof api
         * @interface IFileAuthReq
         * @property {api.IFile|null} [file] FileAuthReq file
         * @property {api.FileAuthMethod|null} [method] FileAuthReq method
         */

        /**
         * Constructs a new FileAuthReq.
         * @memberof api
         * @classdesc Represents a FileAuthReq.
         * @implements IFileAuthReq
         * @constructor
         * @param {api.IFileAuthReq=} [properties] Properties to set
         */
        function FileAuthReq(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * FileAuthReq file.
         * @member {api.IFile|null|undefined} file
         * @memberof api.FileAuthReq
         * @instance
         */
        FileAuthReq.prototype.file = null;

        /**
         * FileAuthReq method.
         * @member {api.FileAuthMethod} method
         * @memberof api.FileAuthReq
         * @instance
         */
        FileAuthReq.prototype.method = 0;

        /**
         * Creates a new FileAuthReq instance using the specified properties.
         * @function create
         * @memberof api.FileAuthReq
         * @static
         * @param {api.IFileAuthReq=} [properties] Properties to set
         * @returns {api.FileAuthReq} FileAuthReq instance
         */
        FileAuthReq.create = function create(properties) {
            return new FileAuthReq(properties);
        };

        /**
         * Encodes the specified FileAuthReq message. Does not implicitly {@link api.FileAuthReq.verify|verify} messages.
         * @function encode
         * @memberof api.FileAuthReq
         * @static
         * @param {api.IFileAuthReq} message FileAuthReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        FileAuthReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.file != null && message.hasOwnProperty("file"))
                $root.api.File.encode(message.file, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.method != null && message.hasOwnProperty("method"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.method);
            return writer;
        };

        /**
         * Encodes the specified FileAuthReq message, length delimited. Does not implicitly {@link api.FileAuthReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof api.FileAuthReq
         * @static
         * @param {api.IFileAuthReq} message FileAuthReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        FileAuthReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a FileAuthReq message from the specified reader or buffer.
         * @function decode
         * @memberof api.FileAuthReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {api.FileAuthReq} FileAuthReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        FileAuthReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.api.FileAuthReq();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.file = $root.api.File.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.method = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a FileAuthReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof api.FileAuthReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {api.FileAuthReq} FileAuthReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        FileAuthReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a FileAuthReq message.
         * @function verify
         * @memberof api.FileAuthReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        FileAuthReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.file != null && message.hasOwnProperty("file")) {
                var error = $root.api.File.verify(message.file);
                if (error)
                    return "file." + error;
            }
            if (message.method != null && message.hasOwnProperty("method"))
                switch (message.method) {
                default:
                    return "method: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                    break;
                }
            return null;
        };

        /**
         * Creates a FileAuthReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof api.FileAuthReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {api.FileAuthReq} FileAuthReq
         */
        FileAuthReq.fromObject = function fromObject(object) {
            if (object instanceof $root.api.FileAuthReq)
                return object;
            var message = new $root.api.FileAuthReq();
            if (object.file != null) {
                if (typeof object.file !== "object")
                    throw TypeError(".api.FileAuthReq.file: object expected");
                message.file = $root.api.File.fromObject(object.file);
            }
            switch (object.method) {
            case "GET":
            case 0:
                message.method = 0;
                break;
            case "HEAD":
            case 1:
                message.method = 1;
                break;
            case "PUT":
            case 2:
                message.method = 2;
                break;
            case "DELETE":
            case 3:
                message.method = 3;
                break;
            }
            return message;
        };

        /**
         * Creates a plain object from a FileAuthReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof api.FileAuthReq
         * @static
         * @param {api.FileAuthReq} message FileAuthReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        FileAuthReq.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.file = null;
                object.method = options.enums === String ? "GET" : 0;
            }
            if (message.file != null && message.hasOwnProperty("file"))
                object.file = $root.api.File.toObject(message.file, options);
            if (message.method != null && message.hasOwnProperty("method"))
                object.method = options.enums === String ? $root.api.FileAuthMethod[message.method] : message.method;
            return object;
        };

        /**
         * Converts this FileAuthReq to JSON.
         * @function toJSON
         * @memberof api.FileAuthReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        FileAuthReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return FileAuthReq;
    })();

    api.MultiFileAuthRes = (function() {

        /**
         * Properties of a MultiFileAuthRes.
         * @memberof api
         * @interface IMultiFileAuthRes
         * @property {api.IFileAuthRes|null} [put] MultiFileAuthRes put
         * @property {api.IFileAuthRes|null} [del] MultiFileAuthRes del
         */

        /**
         * Constructs a new MultiFileAuthRes.
         * @memberof api
         * @classdesc Represents a MultiFileAuthRes.
         * @implements IMultiFileAuthRes
         * @constructor
         * @param {api.IMultiFileAuthRes=} [properties] Properties to set
         */
        function MultiFileAuthRes(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * MultiFileAuthRes put.
         * @member {api.IFileAuthRes|null|undefined} put
         * @memberof api.MultiFileAuthRes
         * @instance
         */
        MultiFileAuthRes.prototype.put = null;

        /**
         * MultiFileAuthRes del.
         * @member {api.IFileAuthRes|null|undefined} del
         * @memberof api.MultiFileAuthRes
         * @instance
         */
        MultiFileAuthRes.prototype.del = null;

        /**
         * Creates a new MultiFileAuthRes instance using the specified properties.
         * @function create
         * @memberof api.MultiFileAuthRes
         * @static
         * @param {api.IMultiFileAuthRes=} [properties] Properties to set
         * @returns {api.MultiFileAuthRes} MultiFileAuthRes instance
         */
        MultiFileAuthRes.create = function create(properties) {
            return new MultiFileAuthRes(properties);
        };

        /**
         * Encodes the specified MultiFileAuthRes message. Does not implicitly {@link api.MultiFileAuthRes.verify|verify} messages.
         * @function encode
         * @memberof api.MultiFileAuthRes
         * @static
         * @param {api.IMultiFileAuthRes} message MultiFileAuthRes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MultiFileAuthRes.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.put != null && message.hasOwnProperty("put"))
                $root.api.FileAuthRes.encode(message.put, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.del != null && message.hasOwnProperty("del"))
                $root.api.FileAuthRes.encode(message.del, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified MultiFileAuthRes message, length delimited. Does not implicitly {@link api.MultiFileAuthRes.verify|verify} messages.
         * @function encodeDelimited
         * @memberof api.MultiFileAuthRes
         * @static
         * @param {api.IMultiFileAuthRes} message MultiFileAuthRes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MultiFileAuthRes.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a MultiFileAuthRes message from the specified reader or buffer.
         * @function decode
         * @memberof api.MultiFileAuthRes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {api.MultiFileAuthRes} MultiFileAuthRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MultiFileAuthRes.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.api.MultiFileAuthRes();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.put = $root.api.FileAuthRes.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.del = $root.api.FileAuthRes.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a MultiFileAuthRes message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof api.MultiFileAuthRes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {api.MultiFileAuthRes} MultiFileAuthRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MultiFileAuthRes.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a MultiFileAuthRes message.
         * @function verify
         * @memberof api.MultiFileAuthRes
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        MultiFileAuthRes.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.put != null && message.hasOwnProperty("put")) {
                var error = $root.api.FileAuthRes.verify(message.put);
                if (error)
                    return "put." + error;
            }
            if (message.del != null && message.hasOwnProperty("del")) {
                var error = $root.api.FileAuthRes.verify(message.del);
                if (error)
                    return "del." + error;
            }
            return null;
        };

        /**
         * Creates a MultiFileAuthRes message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof api.MultiFileAuthRes
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {api.MultiFileAuthRes} MultiFileAuthRes
         */
        MultiFileAuthRes.fromObject = function fromObject(object) {
            if (object instanceof $root.api.MultiFileAuthRes)
                return object;
            var message = new $root.api.MultiFileAuthRes();
            if (object.put != null) {
                if (typeof object.put !== "object")
                    throw TypeError(".api.MultiFileAuthRes.put: object expected");
                message.put = $root.api.FileAuthRes.fromObject(object.put);
            }
            if (object.del != null) {
                if (typeof object.del !== "object")
                    throw TypeError(".api.MultiFileAuthRes.del: object expected");
                message.del = $root.api.FileAuthRes.fromObject(object.del);
            }
            return message;
        };

        /**
         * Creates a plain object from a MultiFileAuthRes message. Also converts values to other types if specified.
         * @function toObject
         * @memberof api.MultiFileAuthRes
         * @static
         * @param {api.MultiFileAuthRes} message MultiFileAuthRes
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        MultiFileAuthRes.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.put = null;
                object.del = null;
            }
            if (message.put != null && message.hasOwnProperty("put"))
                object.put = $root.api.FileAuthRes.toObject(message.put, options);
            if (message.del != null && message.hasOwnProperty("del"))
                object.del = $root.api.FileAuthRes.toObject(message.del, options);
            return object;
        };

        /**
         * Converts this MultiFileAuthRes to JSON.
         * @function toJSON
         * @memberof api.MultiFileAuthRes
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        MultiFileAuthRes.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return MultiFileAuthRes;
    })();

    api.FileAuthRes = (function() {

        /**
         * Properties of a FileAuthRes.
         * @memberof api
         * @interface IFileAuthRes
         * @property {api.IFile|null} [file] FileAuthRes file
         * @property {string|null} [url] FileAuthRes url
         * @property {api.FileAuthMethod|null} [method] FileAuthRes method
         * @property {number|Long|null} [expire] FileAuthRes expire
         * @property {string|null} [error] FileAuthRes error
         */

        /**
         * Constructs a new FileAuthRes.
         * @memberof api
         * @classdesc Represents a FileAuthRes.
         * @implements IFileAuthRes
         * @constructor
         * @param {api.IFileAuthRes=} [properties] Properties to set
         */
        function FileAuthRes(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * FileAuthRes file.
         * @member {api.IFile|null|undefined} file
         * @memberof api.FileAuthRes
         * @instance
         */
        FileAuthRes.prototype.file = null;

        /**
         * FileAuthRes url.
         * @member {string} url
         * @memberof api.FileAuthRes
         * @instance
         */
        FileAuthRes.prototype.url = "";

        /**
         * FileAuthRes method.
         * @member {api.FileAuthMethod} method
         * @memberof api.FileAuthRes
         * @instance
         */
        FileAuthRes.prototype.method = 0;

        /**
         * FileAuthRes expire.
         * @member {number|Long} expire
         * @memberof api.FileAuthRes
         * @instance
         */
        FileAuthRes.prototype.expire = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * FileAuthRes error.
         * @member {string} error
         * @memberof api.FileAuthRes
         * @instance
         */
        FileAuthRes.prototype.error = "";

        /**
         * Creates a new FileAuthRes instance using the specified properties.
         * @function create
         * @memberof api.FileAuthRes
         * @static
         * @param {api.IFileAuthRes=} [properties] Properties to set
         * @returns {api.FileAuthRes} FileAuthRes instance
         */
        FileAuthRes.create = function create(properties) {
            return new FileAuthRes(properties);
        };

        /**
         * Encodes the specified FileAuthRes message. Does not implicitly {@link api.FileAuthRes.verify|verify} messages.
         * @function encode
         * @memberof api.FileAuthRes
         * @static
         * @param {api.IFileAuthRes} message FileAuthRes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        FileAuthRes.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.file != null && message.hasOwnProperty("file"))
                $root.api.File.encode(message.file, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.url != null && message.hasOwnProperty("url"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.url);
            if (message.method != null && message.hasOwnProperty("method"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.method);
            if (message.expire != null && message.hasOwnProperty("expire"))
                writer.uint32(/* id 4, wireType 0 =*/32).int64(message.expire);
            if (message.error != null && message.hasOwnProperty("error"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.error);
            return writer;
        };

        /**
         * Encodes the specified FileAuthRes message, length delimited. Does not implicitly {@link api.FileAuthRes.verify|verify} messages.
         * @function encodeDelimited
         * @memberof api.FileAuthRes
         * @static
         * @param {api.IFileAuthRes} message FileAuthRes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        FileAuthRes.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a FileAuthRes message from the specified reader or buffer.
         * @function decode
         * @memberof api.FileAuthRes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {api.FileAuthRes} FileAuthRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        FileAuthRes.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.api.FileAuthRes();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.file = $root.api.File.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.url = reader.string();
                    break;
                case 3:
                    message.method = reader.int32();
                    break;
                case 4:
                    message.expire = reader.int64();
                    break;
                case 5:
                    message.error = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a FileAuthRes message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof api.FileAuthRes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {api.FileAuthRes} FileAuthRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        FileAuthRes.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a FileAuthRes message.
         * @function verify
         * @memberof api.FileAuthRes
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        FileAuthRes.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.file != null && message.hasOwnProperty("file")) {
                var error = $root.api.File.verify(message.file);
                if (error)
                    return "file." + error;
            }
            if (message.url != null && message.hasOwnProperty("url"))
                if (!$util.isString(message.url))
                    return "url: string expected";
            if (message.method != null && message.hasOwnProperty("method"))
                switch (message.method) {
                default:
                    return "method: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                    break;
                }
            if (message.expire != null && message.hasOwnProperty("expire"))
                if (!$util.isInteger(message.expire) && !(message.expire && $util.isInteger(message.expire.low) && $util.isInteger(message.expire.high)))
                    return "expire: integer|Long expected";
            if (message.error != null && message.hasOwnProperty("error"))
                if (!$util.isString(message.error))
                    return "error: string expected";
            return null;
        };

        /**
         * Creates a FileAuthRes message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof api.FileAuthRes
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {api.FileAuthRes} FileAuthRes
         */
        FileAuthRes.fromObject = function fromObject(object) {
            if (object instanceof $root.api.FileAuthRes)
                return object;
            var message = new $root.api.FileAuthRes();
            if (object.file != null) {
                if (typeof object.file !== "object")
                    throw TypeError(".api.FileAuthRes.file: object expected");
                message.file = $root.api.File.fromObject(object.file);
            }
            if (object.url != null)
                message.url = String(object.url);
            switch (object.method) {
            case "GET":
            case 0:
                message.method = 0;
                break;
            case "HEAD":
            case 1:
                message.method = 1;
                break;
            case "PUT":
            case 2:
                message.method = 2;
                break;
            case "DELETE":
            case 3:
                message.method = 3;
                break;
            }
            if (object.expire != null)
                if ($util.Long)
                    (message.expire = $util.Long.fromValue(object.expire)).unsigned = false;
                else if (typeof object.expire === "string")
                    message.expire = parseInt(object.expire, 10);
                else if (typeof object.expire === "number")
                    message.expire = object.expire;
                else if (typeof object.expire === "object")
                    message.expire = new $util.LongBits(object.expire.low >>> 0, object.expire.high >>> 0).toNumber();
            if (object.error != null)
                message.error = String(object.error);
            return message;
        };

        /**
         * Creates a plain object from a FileAuthRes message. Also converts values to other types if specified.
         * @function toObject
         * @memberof api.FileAuthRes
         * @static
         * @param {api.FileAuthRes} message FileAuthRes
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        FileAuthRes.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.file = null;
                object.url = "";
                object.method = options.enums === String ? "GET" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.expire = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.expire = options.longs === String ? "0" : 0;
                object.error = "";
            }
            if (message.file != null && message.hasOwnProperty("file"))
                object.file = $root.api.File.toObject(message.file, options);
            if (message.url != null && message.hasOwnProperty("url"))
                object.url = message.url;
            if (message.method != null && message.hasOwnProperty("method"))
                object.method = options.enums === String ? $root.api.FileAuthMethod[message.method] : message.method;
            if (message.expire != null && message.hasOwnProperty("expire"))
                if (typeof message.expire === "number")
                    object.expire = options.longs === String ? String(message.expire) : message.expire;
                else
                    object.expire = options.longs === String ? $util.Long.prototype.toString.call(message.expire) : options.longs === Number ? new $util.LongBits(message.expire.low >>> 0, message.expire.high >>> 0).toNumber() : message.expire;
            if (message.error != null && message.hasOwnProperty("error"))
                object.error = message.error;
            return object;
        };

        /**
         * Converts this FileAuthRes to JSON.
         * @function toJSON
         * @memberof api.FileAuthRes
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        FileAuthRes.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return FileAuthRes;
    })();

    api.Disconnect = (function() {

        /**
         * Properties of a Disconnect.
         * @memberof api
         * @interface IDisconnect
         * @property {string|null} [error] Disconnect error
         */

        /**
         * Constructs a new Disconnect.
         * @memberof api
         * @classdesc Represents a Disconnect.
         * @implements IDisconnect
         * @constructor
         * @param {api.IDisconnect=} [properties] Properties to set
         */
        function Disconnect(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Disconnect error.
         * @member {string} error
         * @memberof api.Disconnect
         * @instance
         */
        Disconnect.prototype.error = "";

        /**
         * Creates a new Disconnect instance using the specified properties.
         * @function create
         * @memberof api.Disconnect
         * @static
         * @param {api.IDisconnect=} [properties] Properties to set
         * @returns {api.Disconnect} Disconnect instance
         */
        Disconnect.create = function create(properties) {
            return new Disconnect(properties);
        };

        /**
         * Encodes the specified Disconnect message. Does not implicitly {@link api.Disconnect.verify|verify} messages.
         * @function encode
         * @memberof api.Disconnect
         * @static
         * @param {api.IDisconnect} message Disconnect message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Disconnect.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.error != null && message.hasOwnProperty("error"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.error);
            return writer;
        };

        /**
         * Encodes the specified Disconnect message, length delimited. Does not implicitly {@link api.Disconnect.verify|verify} messages.
         * @function encodeDelimited
         * @memberof api.Disconnect
         * @static
         * @param {api.IDisconnect} message Disconnect message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Disconnect.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Disconnect message from the specified reader or buffer.
         * @function decode
         * @memberof api.Disconnect
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {api.Disconnect} Disconnect
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Disconnect.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.api.Disconnect();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.error = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Disconnect message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof api.Disconnect
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {api.Disconnect} Disconnect
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Disconnect.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Disconnect message.
         * @function verify
         * @memberof api.Disconnect
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Disconnect.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.error != null && message.hasOwnProperty("error"))
                if (!$util.isString(message.error))
                    return "error: string expected";
            return null;
        };

        /**
         * Creates a Disconnect message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof api.Disconnect
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {api.Disconnect} Disconnect
         */
        Disconnect.fromObject = function fromObject(object) {
            if (object instanceof $root.api.Disconnect)
                return object;
            var message = new $root.api.Disconnect();
            if (object.error != null)
                message.error = String(object.error);
            return message;
        };

        /**
         * Creates a plain object from a Disconnect message. Also converts values to other types if specified.
         * @function toObject
         * @memberof api.Disconnect
         * @static
         * @param {api.Disconnect} message Disconnect
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Disconnect.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.error = "";
            if (message.error != null && message.hasOwnProperty("error"))
                object.error = message.error;
            return object;
        };

        /**
         * Converts this Disconnect to JSON.
         * @function toJSON
         * @memberof api.Disconnect
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Disconnect.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Disconnect;
    })();

    api.Send = (function() {

        /**
         * Properties of a Send.
         * @memberof api
         * @interface ISend
         * @property {Uint8Array|null} [buff] Send buff
         */

        /**
         * Constructs a new Send.
         * @memberof api
         * @classdesc Represents a Send.
         * @implements ISend
         * @constructor
         * @param {api.ISend=} [properties] Properties to set
         */
        function Send(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Send buff.
         * @member {Uint8Array} buff
         * @memberof api.Send
         * @instance
         */
        Send.prototype.buff = $util.newBuffer([]);

        /**
         * Creates a new Send instance using the specified properties.
         * @function create
         * @memberof api.Send
         * @static
         * @param {api.ISend=} [properties] Properties to set
         * @returns {api.Send} Send instance
         */
        Send.create = function create(properties) {
            return new Send(properties);
        };

        /**
         * Encodes the specified Send message. Does not implicitly {@link api.Send.verify|verify} messages.
         * @function encode
         * @memberof api.Send
         * @static
         * @param {api.ISend} message Send message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Send.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.buff != null && message.hasOwnProperty("buff"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.buff);
            return writer;
        };

        /**
         * Encodes the specified Send message, length delimited. Does not implicitly {@link api.Send.verify|verify} messages.
         * @function encodeDelimited
         * @memberof api.Send
         * @static
         * @param {api.ISend} message Send message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Send.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Send message from the specified reader or buffer.
         * @function decode
         * @memberof api.Send
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {api.Send} Send
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Send.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.api.Send();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.buff = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Send message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof api.Send
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {api.Send} Send
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Send.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Send message.
         * @function verify
         * @memberof api.Send
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Send.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.buff != null && message.hasOwnProperty("buff"))
                if (!(message.buff && typeof message.buff.length === "number" || $util.isString(message.buff)))
                    return "buff: buffer expected";
            return null;
        };

        /**
         * Creates a Send message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof api.Send
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {api.Send} Send
         */
        Send.fromObject = function fromObject(object) {
            if (object instanceof $root.api.Send)
                return object;
            var message = new $root.api.Send();
            if (object.buff != null)
                if (typeof object.buff === "string")
                    $util.base64.decode(object.buff, message.buff = $util.newBuffer($util.base64.length(object.buff)), 0);
                else if (object.buff.length)
                    message.buff = object.buff;
            return message;
        };

        /**
         * Creates a plain object from a Send message. Also converts values to other types if specified.
         * @function toObject
         * @memberof api.Send
         * @static
         * @param {api.Send} message Send
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Send.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                if (options.bytes === String)
                    object.buff = "";
                else {
                    object.buff = [];
                    if (options.bytes !== Array)
                        object.buff = $util.newBuffer(object.buff);
                }
            if (message.buff != null && message.hasOwnProperty("buff"))
                object.buff = options.bytes === String ? $util.base64.encode(message.buff, 0, message.buff.length) : options.bytes === Array ? Array.prototype.slice.call(message.buff) : message.buff;
            return object;
        };

        /**
         * Converts this Send to JSON.
         * @function toJSON
         * @memberof api.Send
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Send.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Send;
    })();

    api.Recv = (function() {

        /**
         * Properties of a Recv.
         * @memberof api
         * @interface IRecv
         * @property {Uint8Array|null} [buff] Recv buff
         */

        /**
         * Constructs a new Recv.
         * @memberof api
         * @classdesc Represents a Recv.
         * @implements IRecv
         * @constructor
         * @param {api.IRecv=} [properties] Properties to set
         */
        function Recv(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Recv buff.
         * @member {Uint8Array} buff
         * @memberof api.Recv
         * @instance
         */
        Recv.prototype.buff = $util.newBuffer([]);

        /**
         * Creates a new Recv instance using the specified properties.
         * @function create
         * @memberof api.Recv
         * @static
         * @param {api.IRecv=} [properties] Properties to set
         * @returns {api.Recv} Recv instance
         */
        Recv.create = function create(properties) {
            return new Recv(properties);
        };

        /**
         * Encodes the specified Recv message. Does not implicitly {@link api.Recv.verify|verify} messages.
         * @function encode
         * @memberof api.Recv
         * @static
         * @param {api.IRecv} message Recv message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Recv.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.buff != null && message.hasOwnProperty("buff"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.buff);
            return writer;
        };

        /**
         * Encodes the specified Recv message, length delimited. Does not implicitly {@link api.Recv.verify|verify} messages.
         * @function encodeDelimited
         * @memberof api.Recv
         * @static
         * @param {api.IRecv} message Recv message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Recv.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Recv message from the specified reader or buffer.
         * @function decode
         * @memberof api.Recv
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {api.Recv} Recv
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Recv.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.api.Recv();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.buff = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Recv message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof api.Recv
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {api.Recv} Recv
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Recv.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Recv message.
         * @function verify
         * @memberof api.Recv
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Recv.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.buff != null && message.hasOwnProperty("buff"))
                if (!(message.buff && typeof message.buff.length === "number" || $util.isString(message.buff)))
                    return "buff: buffer expected";
            return null;
        };

        /**
         * Creates a Recv message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof api.Recv
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {api.Recv} Recv
         */
        Recv.fromObject = function fromObject(object) {
            if (object instanceof $root.api.Recv)
                return object;
            var message = new $root.api.Recv();
            if (object.buff != null)
                if (typeof object.buff === "string")
                    $util.base64.decode(object.buff, message.buff = $util.newBuffer($util.base64.length(object.buff)), 0);
                else if (object.buff.length)
                    message.buff = object.buff;
            return message;
        };

        /**
         * Creates a plain object from a Recv message. Also converts values to other types if specified.
         * @function toObject
         * @memberof api.Recv
         * @static
         * @param {api.Recv} message Recv
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Recv.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                if (options.bytes === String)
                    object.buff = "";
                else {
                    object.buff = [];
                    if (options.bytes !== Array)
                        object.buff = $util.newBuffer(object.buff);
                }
            if (message.buff != null && message.hasOwnProperty("buff"))
                object.buff = options.bytes === String ? $util.base64.encode(message.buff, 0, message.buff.length) : options.bytes === Array ? Array.prototype.slice.call(message.buff) : message.buff;
            return object;
        };

        /**
         * Converts this Recv to JSON.
         * @function toJSON
         * @memberof api.Recv
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Recv.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Recv;
    })();

    api.Connect = (function() {

        /**
         * Properties of a Connect.
         * @memberof api
         * @interface IConnect
         * @property {string|null} [proto] Connect proto
         * @property {string|null} [addr] Connect addr
         */

        /**
         * Constructs a new Connect.
         * @memberof api
         * @classdesc Represents a Connect.
         * @implements IConnect
         * @constructor
         * @param {api.IConnect=} [properties] Properties to set
         */
        function Connect(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Connect proto.
         * @member {string} proto
         * @memberof api.Connect
         * @instance
         */
        Connect.prototype.proto = "";

        /**
         * Connect addr.
         * @member {string} addr
         * @memberof api.Connect
         * @instance
         */
        Connect.prototype.addr = "";

        /**
         * Creates a new Connect instance using the specified properties.
         * @function create
         * @memberof api.Connect
         * @static
         * @param {api.IConnect=} [properties] Properties to set
         * @returns {api.Connect} Connect instance
         */
        Connect.create = function create(properties) {
            return new Connect(properties);
        };

        /**
         * Encodes the specified Connect message. Does not implicitly {@link api.Connect.verify|verify} messages.
         * @function encode
         * @memberof api.Connect
         * @static
         * @param {api.IConnect} message Connect message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Connect.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.proto != null && message.hasOwnProperty("proto"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.proto);
            if (message.addr != null && message.hasOwnProperty("addr"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.addr);
            return writer;
        };

        /**
         * Encodes the specified Connect message, length delimited. Does not implicitly {@link api.Connect.verify|verify} messages.
         * @function encodeDelimited
         * @memberof api.Connect
         * @static
         * @param {api.IConnect} message Connect message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Connect.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Connect message from the specified reader or buffer.
         * @function decode
         * @memberof api.Connect
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {api.Connect} Connect
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Connect.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.api.Connect();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.proto = reader.string();
                    break;
                case 2:
                    message.addr = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Connect message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof api.Connect
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {api.Connect} Connect
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Connect.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Connect message.
         * @function verify
         * @memberof api.Connect
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Connect.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.proto != null && message.hasOwnProperty("proto"))
                if (!$util.isString(message.proto))
                    return "proto: string expected";
            if (message.addr != null && message.hasOwnProperty("addr"))
                if (!$util.isString(message.addr))
                    return "addr: string expected";
            return null;
        };

        /**
         * Creates a Connect message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof api.Connect
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {api.Connect} Connect
         */
        Connect.fromObject = function fromObject(object) {
            if (object instanceof $root.api.Connect)
                return object;
            var message = new $root.api.Connect();
            if (object.proto != null)
                message.proto = String(object.proto);
            if (object.addr != null)
                message.addr = String(object.addr);
            return message;
        };

        /**
         * Creates a plain object from a Connect message. Also converts values to other types if specified.
         * @function toObject
         * @memberof api.Connect
         * @static
         * @param {api.Connect} message Connect
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Connect.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.proto = "";
                object.addr = "";
            }
            if (message.proto != null && message.hasOwnProperty("proto"))
                object.proto = message.proto;
            if (message.addr != null && message.hasOwnProperty("addr"))
                object.addr = message.addr;
            return object;
        };

        /**
         * Converts this Connect to JSON.
         * @function toJSON
         * @memberof api.Connect
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Connect.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Connect;
    })();

    api.Hint = (function() {

        /**
         * Properties of a Hint.
         * @memberof api
         * @interface IHint
         * @property {string|null} [text] Hint text
         */

        /**
         * Constructs a new Hint.
         * @memberof api
         * @classdesc Represents a Hint.
         * @implements IHint
         * @constructor
         * @param {api.IHint=} [properties] Properties to set
         */
        function Hint(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Hint text.
         * @member {string} text
         * @memberof api.Hint
         * @instance
         */
        Hint.prototype.text = "";

        /**
         * Creates a new Hint instance using the specified properties.
         * @function create
         * @memberof api.Hint
         * @static
         * @param {api.IHint=} [properties] Properties to set
         * @returns {api.Hint} Hint instance
         */
        Hint.create = function create(properties) {
            return new Hint(properties);
        };

        /**
         * Encodes the specified Hint message. Does not implicitly {@link api.Hint.verify|verify} messages.
         * @function encode
         * @memberof api.Hint
         * @static
         * @param {api.IHint} message Hint message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Hint.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.text != null && message.hasOwnProperty("text"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.text);
            return writer;
        };

        /**
         * Encodes the specified Hint message, length delimited. Does not implicitly {@link api.Hint.verify|verify} messages.
         * @function encodeDelimited
         * @memberof api.Hint
         * @static
         * @param {api.IHint} message Hint message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Hint.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Hint message from the specified reader or buffer.
         * @function decode
         * @memberof api.Hint
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {api.Hint} Hint
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Hint.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.api.Hint();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.text = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Hint message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof api.Hint
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {api.Hint} Hint
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Hint.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Hint message.
         * @function verify
         * @memberof api.Hint
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Hint.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.text != null && message.hasOwnProperty("text"))
                if (!$util.isString(message.text))
                    return "text: string expected";
            return null;
        };

        /**
         * Creates a Hint message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof api.Hint
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {api.Hint} Hint
         */
        Hint.fromObject = function fromObject(object) {
            if (object instanceof $root.api.Hint)
                return object;
            var message = new $root.api.Hint();
            if (object.text != null)
                message.text = String(object.text);
            return message;
        };

        /**
         * Creates a plain object from a Hint message. Also converts values to other types if specified.
         * @function toObject
         * @memberof api.Hint
         * @static
         * @param {api.Hint} message Hint
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Hint.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.text = "";
            if (message.text != null && message.hasOwnProperty("text"))
                object.text = message.text;
            return object;
        };

        /**
         * Converts this Hint to JSON.
         * @function toJSON
         * @memberof api.Hint
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Hint.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Hint;
    })();

    api.Ping = (function() {

        /**
         * Properties of a Ping.
         * @memberof api
         * @interface IPing
         */

        /**
         * Constructs a new Ping.
         * @memberof api
         * @classdesc Represents a Ping.
         * @implements IPing
         * @constructor
         * @param {api.IPing=} [properties] Properties to set
         */
        function Ping(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new Ping instance using the specified properties.
         * @function create
         * @memberof api.Ping
         * @static
         * @param {api.IPing=} [properties] Properties to set
         * @returns {api.Ping} Ping instance
         */
        Ping.create = function create(properties) {
            return new Ping(properties);
        };

        /**
         * Encodes the specified Ping message. Does not implicitly {@link api.Ping.verify|verify} messages.
         * @function encode
         * @memberof api.Ping
         * @static
         * @param {api.IPing} message Ping message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Ping.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified Ping message, length delimited. Does not implicitly {@link api.Ping.verify|verify} messages.
         * @function encodeDelimited
         * @memberof api.Ping
         * @static
         * @param {api.IPing} message Ping message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Ping.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Ping message from the specified reader or buffer.
         * @function decode
         * @memberof api.Ping
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {api.Ping} Ping
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Ping.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.api.Ping();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Ping message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof api.Ping
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {api.Ping} Ping
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Ping.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Ping message.
         * @function verify
         * @memberof api.Ping
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Ping.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a Ping message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof api.Ping
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {api.Ping} Ping
         */
        Ping.fromObject = function fromObject(object) {
            if (object instanceof $root.api.Ping)
                return object;
            return new $root.api.Ping();
        };

        /**
         * Creates a plain object from a Ping message. Also converts values to other types if specified.
         * @function toObject
         * @memberof api.Ping
         * @static
         * @param {api.Ping} message Ping
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Ping.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this Ping to JSON.
         * @function toJSON
         * @memberof api.Ping
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Ping.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Ping;
    })();

    api.Pong = (function() {

        /**
         * Properties of a Pong.
         * @memberof api
         * @interface IPong
         */

        /**
         * Constructs a new Pong.
         * @memberof api
         * @classdesc Represents a Pong.
         * @implements IPong
         * @constructor
         * @param {api.IPong=} [properties] Properties to set
         */
        function Pong(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new Pong instance using the specified properties.
         * @function create
         * @memberof api.Pong
         * @static
         * @param {api.IPong=} [properties] Properties to set
         * @returns {api.Pong} Pong instance
         */
        Pong.create = function create(properties) {
            return new Pong(properties);
        };

        /**
         * Encodes the specified Pong message. Does not implicitly {@link api.Pong.verify|verify} messages.
         * @function encode
         * @memberof api.Pong
         * @static
         * @param {api.IPong} message Pong message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Pong.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified Pong message, length delimited. Does not implicitly {@link api.Pong.verify|verify} messages.
         * @function encodeDelimited
         * @memberof api.Pong
         * @static
         * @param {api.IPong} message Pong message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Pong.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Pong message from the specified reader or buffer.
         * @function decode
         * @memberof api.Pong
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {api.Pong} Pong
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Pong.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.api.Pong();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Pong message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof api.Pong
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {api.Pong} Pong
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Pong.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Pong message.
         * @function verify
         * @memberof api.Pong
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Pong.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a Pong message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof api.Pong
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {api.Pong} Pong
         */
        Pong.fromObject = function fromObject(object) {
            if (object instanceof $root.api.Pong)
                return object;
            return new $root.api.Pong();
        };

        /**
         * Creates a plain object from a Pong message. Also converts values to other types if specified.
         * @function toObject
         * @memberof api.Pong
         * @static
         * @param {api.Pong} message Pong
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Pong.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this Pong to JSON.
         * @function toJSON
         * @memberof api.Pong
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Pong.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Pong;
    })();

    api.Hello = (function() {

        /**
         * Properties of a Hello.
         * @memberof api
         * @interface IHello
         * @property {number|null} [userid] Hello userid
         * @property {string|null} [username] Hello username
         * @property {string|null} [token] Hello token
         */

        /**
         * Constructs a new Hello.
         * @memberof api
         * @classdesc Represents a Hello.
         * @implements IHello
         * @constructor
         * @param {api.IHello=} [properties] Properties to set
         */
        function Hello(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Hello userid.
         * @member {number} userid
         * @memberof api.Hello
         * @instance
         */
        Hello.prototype.userid = 0;

        /**
         * Hello username.
         * @member {string} username
         * @memberof api.Hello
         * @instance
         */
        Hello.prototype.username = "";

        /**
         * Hello token.
         * @member {string} token
         * @memberof api.Hello
         * @instance
         */
        Hello.prototype.token = "";

        /**
         * Creates a new Hello instance using the specified properties.
         * @function create
         * @memberof api.Hello
         * @static
         * @param {api.IHello=} [properties] Properties to set
         * @returns {api.Hello} Hello instance
         */
        Hello.create = function create(properties) {
            return new Hello(properties);
        };

        /**
         * Encodes the specified Hello message. Does not implicitly {@link api.Hello.verify|verify} messages.
         * @function encode
         * @memberof api.Hello
         * @static
         * @param {api.IHello} message Hello message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Hello.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.userid != null && message.hasOwnProperty("userid"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.userid);
            if (message.username != null && message.hasOwnProperty("username"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.username);
            if (message.token != null && message.hasOwnProperty("token"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.token);
            return writer;
        };

        /**
         * Encodes the specified Hello message, length delimited. Does not implicitly {@link api.Hello.verify|verify} messages.
         * @function encodeDelimited
         * @memberof api.Hello
         * @static
         * @param {api.IHello} message Hello message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Hello.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Hello message from the specified reader or buffer.
         * @function decode
         * @memberof api.Hello
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {api.Hello} Hello
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Hello.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.api.Hello();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.userid = reader.uint32();
                    break;
                case 2:
                    message.username = reader.string();
                    break;
                case 3:
                    message.token = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Hello message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof api.Hello
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {api.Hello} Hello
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Hello.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Hello message.
         * @function verify
         * @memberof api.Hello
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Hello.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.userid != null && message.hasOwnProperty("userid"))
                if (!$util.isInteger(message.userid))
                    return "userid: integer expected";
            if (message.username != null && message.hasOwnProperty("username"))
                if (!$util.isString(message.username))
                    return "username: string expected";
            if (message.token != null && message.hasOwnProperty("token"))
                if (!$util.isString(message.token))
                    return "token: string expected";
            return null;
        };

        /**
         * Creates a Hello message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof api.Hello
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {api.Hello} Hello
         */
        Hello.fromObject = function fromObject(object) {
            if (object instanceof $root.api.Hello)
                return object;
            var message = new $root.api.Hello();
            if (object.userid != null)
                message.userid = object.userid >>> 0;
            if (object.username != null)
                message.username = String(object.username);
            if (object.token != null)
                message.token = String(object.token);
            return message;
        };

        /**
         * Creates a plain object from a Hello message. Also converts values to other types if specified.
         * @function toObject
         * @memberof api.Hello
         * @static
         * @param {api.Hello} message Hello
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Hello.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.userid = 0;
                object.username = "";
                object.token = "";
            }
            if (message.userid != null && message.hasOwnProperty("userid"))
                object.userid = message.userid;
            if (message.username != null && message.hasOwnProperty("username"))
                object.username = message.username;
            if (message.token != null && message.hasOwnProperty("token"))
                object.token = message.token;
            return object;
        };

        /**
         * Converts this Hello to JSON.
         * @function toJSON
         * @memberof api.Hello
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Hello.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Hello;
    })();

    api.Goodbye = (function() {

        /**
         * Properties of a Goodbye.
         * @memberof api
         * @interface IGoodbye
         */

        /**
         * Constructs a new Goodbye.
         * @memberof api
         * @classdesc Represents a Goodbye.
         * @implements IGoodbye
         * @constructor
         * @param {api.IGoodbye=} [properties] Properties to set
         */
        function Goodbye(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new Goodbye instance using the specified properties.
         * @function create
         * @memberof api.Goodbye
         * @static
         * @param {api.IGoodbye=} [properties] Properties to set
         * @returns {api.Goodbye} Goodbye instance
         */
        Goodbye.create = function create(properties) {
            return new Goodbye(properties);
        };

        /**
         * Encodes the specified Goodbye message. Does not implicitly {@link api.Goodbye.verify|verify} messages.
         * @function encode
         * @memberof api.Goodbye
         * @static
         * @param {api.IGoodbye} message Goodbye message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Goodbye.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified Goodbye message, length delimited. Does not implicitly {@link api.Goodbye.verify|verify} messages.
         * @function encodeDelimited
         * @memberof api.Goodbye
         * @static
         * @param {api.IGoodbye} message Goodbye message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Goodbye.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Goodbye message from the specified reader or buffer.
         * @function decode
         * @memberof api.Goodbye
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {api.Goodbye} Goodbye
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Goodbye.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.api.Goodbye();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Goodbye message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof api.Goodbye
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {api.Goodbye} Goodbye
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Goodbye.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Goodbye message.
         * @function verify
         * @memberof api.Goodbye
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Goodbye.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a Goodbye message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof api.Goodbye
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {api.Goodbye} Goodbye
         */
        Goodbye.fromObject = function fromObject(object) {
            if (object instanceof $root.api.Goodbye)
                return object;
            return new $root.api.Goodbye();
        };

        /**
         * Creates a plain object from a Goodbye message. Also converts values to other types if specified.
         * @function toObject
         * @memberof api.Goodbye
         * @static
         * @param {api.Goodbye} message Goodbye
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Goodbye.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this Goodbye to JSON.
         * @function toJSON
         * @memberof api.Goodbye
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Goodbye.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Goodbye;
    })();

    /**
     * State enum.
     * @name api.State
     * @enum {string}
     * @property {number} Stopped=0 Stopped value
     * @property {number} Running=1 Running value
     */
    api.State = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "Stopped"] = 0;
        values[valuesById[1] = "Running"] = 1;
        return values;
    })();

    api.CheckChanges = (function() {

        /**
         * Properties of a CheckChanges.
         * @memberof api
         * @interface ICheckChanges
         */

        /**
         * Constructs a new CheckChanges.
         * @memberof api
         * @classdesc Represents a CheckChanges.
         * @implements ICheckChanges
         * @constructor
         * @param {api.ICheckChanges=} [properties] Properties to set
         */
        function CheckChanges(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new CheckChanges instance using the specified properties.
         * @function create
         * @memberof api.CheckChanges
         * @static
         * @param {api.ICheckChanges=} [properties] Properties to set
         * @returns {api.CheckChanges} CheckChanges instance
         */
        CheckChanges.create = function create(properties) {
            return new CheckChanges(properties);
        };

        /**
         * Encodes the specified CheckChanges message. Does not implicitly {@link api.CheckChanges.verify|verify} messages.
         * @function encode
         * @memberof api.CheckChanges
         * @static
         * @param {api.ICheckChanges} message CheckChanges message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CheckChanges.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified CheckChanges message, length delimited. Does not implicitly {@link api.CheckChanges.verify|verify} messages.
         * @function encodeDelimited
         * @memberof api.CheckChanges
         * @static
         * @param {api.ICheckChanges} message CheckChanges message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CheckChanges.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a CheckChanges message from the specified reader or buffer.
         * @function decode
         * @memberof api.CheckChanges
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {api.CheckChanges} CheckChanges
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CheckChanges.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.api.CheckChanges();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a CheckChanges message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof api.CheckChanges
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {api.CheckChanges} CheckChanges
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CheckChanges.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a CheckChanges message.
         * @function verify
         * @memberof api.CheckChanges
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CheckChanges.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a CheckChanges message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof api.CheckChanges
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {api.CheckChanges} CheckChanges
         */
        CheckChanges.fromObject = function fromObject(object) {
            if (object instanceof $root.api.CheckChanges)
                return object;
            return new $root.api.CheckChanges();
        };

        /**
         * Creates a plain object from a CheckChanges message. Also converts values to other types if specified.
         * @function toObject
         * @memberof api.CheckChanges
         * @static
         * @param {api.CheckChanges} message CheckChanges
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CheckChanges.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this CheckChanges to JSON.
         * @function toJSON
         * @memberof api.CheckChanges
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CheckChanges.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return CheckChanges;
    })();

    api.EnsurePackages = (function() {

        /**
         * Properties of an EnsurePackages.
         * @memberof api
         * @interface IEnsurePackages
         * @property {boolean|null} [install] EnsurePackages install
         * @property {api.IFile|null} [file] EnsurePackages file
         */

        /**
         * Constructs a new EnsurePackages.
         * @memberof api
         * @classdesc Represents an EnsurePackages.
         * @implements IEnsurePackages
         * @constructor
         * @param {api.IEnsurePackages=} [properties] Properties to set
         */
        function EnsurePackages(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * EnsurePackages install.
         * @member {boolean} install
         * @memberof api.EnsurePackages
         * @instance
         */
        EnsurePackages.prototype.install = false;

        /**
         * EnsurePackages file.
         * @member {api.IFile|null|undefined} file
         * @memberof api.EnsurePackages
         * @instance
         */
        EnsurePackages.prototype.file = null;

        /**
         * Creates a new EnsurePackages instance using the specified properties.
         * @function create
         * @memberof api.EnsurePackages
         * @static
         * @param {api.IEnsurePackages=} [properties] Properties to set
         * @returns {api.EnsurePackages} EnsurePackages instance
         */
        EnsurePackages.create = function create(properties) {
            return new EnsurePackages(properties);
        };

        /**
         * Encodes the specified EnsurePackages message. Does not implicitly {@link api.EnsurePackages.verify|verify} messages.
         * @function encode
         * @memberof api.EnsurePackages
         * @static
         * @param {api.IEnsurePackages} message EnsurePackages message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EnsurePackages.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.install != null && message.hasOwnProperty("install"))
                writer.uint32(/* id 1, wireType 0 =*/8).bool(message.install);
            if (message.file != null && message.hasOwnProperty("file"))
                $root.api.File.encode(message.file, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified EnsurePackages message, length delimited. Does not implicitly {@link api.EnsurePackages.verify|verify} messages.
         * @function encodeDelimited
         * @memberof api.EnsurePackages
         * @static
         * @param {api.IEnsurePackages} message EnsurePackages message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EnsurePackages.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an EnsurePackages message from the specified reader or buffer.
         * @function decode
         * @memberof api.EnsurePackages
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {api.EnsurePackages} EnsurePackages
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EnsurePackages.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.api.EnsurePackages();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.install = reader.bool();
                    break;
                case 2:
                    message.file = $root.api.File.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an EnsurePackages message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof api.EnsurePackages
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {api.EnsurePackages} EnsurePackages
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EnsurePackages.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an EnsurePackages message.
         * @function verify
         * @memberof api.EnsurePackages
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        EnsurePackages.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.install != null && message.hasOwnProperty("install"))
                if (typeof message.install !== "boolean")
                    return "install: boolean expected";
            if (message.file != null && message.hasOwnProperty("file")) {
                var error = $root.api.File.verify(message.file);
                if (error)
                    return "file." + error;
            }
            return null;
        };

        /**
         * Creates an EnsurePackages message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof api.EnsurePackages
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {api.EnsurePackages} EnsurePackages
         */
        EnsurePackages.fromObject = function fromObject(object) {
            if (object instanceof $root.api.EnsurePackages)
                return object;
            var message = new $root.api.EnsurePackages();
            if (object.install != null)
                message.install = Boolean(object.install);
            if (object.file != null) {
                if (typeof object.file !== "object")
                    throw TypeError(".api.EnsurePackages.file: object expected");
                message.file = $root.api.File.fromObject(object.file);
            }
            return message;
        };

        /**
         * Creates a plain object from an EnsurePackages message. Also converts values to other types if specified.
         * @function toObject
         * @memberof api.EnsurePackages
         * @static
         * @param {api.EnsurePackages} message EnsurePackages
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        EnsurePackages.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.install = false;
                object.file = null;
            }
            if (message.install != null && message.hasOwnProperty("install"))
                object.install = message.install;
            if (message.file != null && message.hasOwnProperty("file"))
                object.file = $root.api.File.toObject(message.file, options);
            return object;
        };

        /**
         * Converts this EnsurePackages to JSON.
         * @function toJSON
         * @memberof api.EnsurePackages
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        EnsurePackages.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return EnsurePackages;
    })();

    api.Start = (function() {

        /**
         * Properties of a Start.
         * @memberof api
         * @interface IStart
         */

        /**
         * Constructs a new Start.
         * @memberof api
         * @classdesc Represents a Start.
         * @implements IStart
         * @constructor
         * @param {api.IStart=} [properties] Properties to set
         */
        function Start(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new Start instance using the specified properties.
         * @function create
         * @memberof api.Start
         * @static
         * @param {api.IStart=} [properties] Properties to set
         * @returns {api.Start} Start instance
         */
        Start.create = function create(properties) {
            return new Start(properties);
        };

        /**
         * Encodes the specified Start message. Does not implicitly {@link api.Start.verify|verify} messages.
         * @function encode
         * @memberof api.Start
         * @static
         * @param {api.IStart} message Start message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Start.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified Start message, length delimited. Does not implicitly {@link api.Start.verify|verify} messages.
         * @function encodeDelimited
         * @memberof api.Start
         * @static
         * @param {api.IStart} message Start message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Start.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Start message from the specified reader or buffer.
         * @function decode
         * @memberof api.Start
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {api.Start} Start
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Start.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.api.Start();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Start message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof api.Start
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {api.Start} Start
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Start.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Start message.
         * @function verify
         * @memberof api.Start
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Start.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a Start message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof api.Start
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {api.Start} Start
         */
        Start.fromObject = function fromObject(object) {
            if (object instanceof $root.api.Start)
                return object;
            return new $root.api.Start();
        };

        /**
         * Creates a plain object from a Start message. Also converts values to other types if specified.
         * @function toObject
         * @memberof api.Start
         * @static
         * @param {api.Start} message Start
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Start.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this Start to JSON.
         * @function toJSON
         * @memberof api.Start
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Start.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Start;
    })();

    api.DebugStatus = (function() {

        /**
         * Properties of a DebugStatus.
         * @memberof api
         * @interface IDebugStatus
         * @property {boolean|null} [done] DebugStatus done
         * @property {Array.<api.IStackFrame>|null} [stack] DebugStatus stack
         */

        /**
         * Constructs a new DebugStatus.
         * @memberof api
         * @classdesc Represents a DebugStatus.
         * @implements IDebugStatus
         * @constructor
         * @param {api.IDebugStatus=} [properties] Properties to set
         */
        function DebugStatus(properties) {
            this.stack = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * DebugStatus done.
         * @member {boolean} done
         * @memberof api.DebugStatus
         * @instance
         */
        DebugStatus.prototype.done = false;

        /**
         * DebugStatus stack.
         * @member {Array.<api.IStackFrame>} stack
         * @memberof api.DebugStatus
         * @instance
         */
        DebugStatus.prototype.stack = $util.emptyArray;

        /**
         * Creates a new DebugStatus instance using the specified properties.
         * @function create
         * @memberof api.DebugStatus
         * @static
         * @param {api.IDebugStatus=} [properties] Properties to set
         * @returns {api.DebugStatus} DebugStatus instance
         */
        DebugStatus.create = function create(properties) {
            return new DebugStatus(properties);
        };

        /**
         * Encodes the specified DebugStatus message. Does not implicitly {@link api.DebugStatus.verify|verify} messages.
         * @function encode
         * @memberof api.DebugStatus
         * @static
         * @param {api.IDebugStatus} message DebugStatus message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DebugStatus.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.done != null && message.hasOwnProperty("done"))
                writer.uint32(/* id 1, wireType 0 =*/8).bool(message.done);
            if (message.stack != null && message.stack.length)
                for (var i = 0; i < message.stack.length; ++i)
                    $root.api.StackFrame.encode(message.stack[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified DebugStatus message, length delimited. Does not implicitly {@link api.DebugStatus.verify|verify} messages.
         * @function encodeDelimited
         * @memberof api.DebugStatus
         * @static
         * @param {api.IDebugStatus} message DebugStatus message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DebugStatus.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a DebugStatus message from the specified reader or buffer.
         * @function decode
         * @memberof api.DebugStatus
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {api.DebugStatus} DebugStatus
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DebugStatus.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.api.DebugStatus();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.done = reader.bool();
                    break;
                case 2:
                    if (!(message.stack && message.stack.length))
                        message.stack = [];
                    message.stack.push($root.api.StackFrame.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a DebugStatus message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof api.DebugStatus
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {api.DebugStatus} DebugStatus
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DebugStatus.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a DebugStatus message.
         * @function verify
         * @memberof api.DebugStatus
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        DebugStatus.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.done != null && message.hasOwnProperty("done"))
                if (typeof message.done !== "boolean")
                    return "done: boolean expected";
            if (message.stack != null && message.hasOwnProperty("stack")) {
                if (!Array.isArray(message.stack))
                    return "stack: array expected";
                for (var i = 0; i < message.stack.length; ++i) {
                    var error = $root.api.StackFrame.verify(message.stack[i]);
                    if (error)
                        return "stack." + error;
                }
            }
            return null;
        };

        /**
         * Creates a DebugStatus message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof api.DebugStatus
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {api.DebugStatus} DebugStatus
         */
        DebugStatus.fromObject = function fromObject(object) {
            if (object instanceof $root.api.DebugStatus)
                return object;
            var message = new $root.api.DebugStatus();
            if (object.done != null)
                message.done = Boolean(object.done);
            if (object.stack) {
                if (!Array.isArray(object.stack))
                    throw TypeError(".api.DebugStatus.stack: array expected");
                message.stack = [];
                for (var i = 0; i < object.stack.length; ++i) {
                    if (typeof object.stack[i] !== "object")
                        throw TypeError(".api.DebugStatus.stack: object expected");
                    message.stack[i] = $root.api.StackFrame.fromObject(object.stack[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a DebugStatus message. Also converts values to other types if specified.
         * @function toObject
         * @memberof api.DebugStatus
         * @static
         * @param {api.DebugStatus} message DebugStatus
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        DebugStatus.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.stack = [];
            if (options.defaults)
                object.done = false;
            if (message.done != null && message.hasOwnProperty("done"))
                object.done = message.done;
            if (message.stack && message.stack.length) {
                object.stack = [];
                for (var j = 0; j < message.stack.length; ++j)
                    object.stack[j] = $root.api.StackFrame.toObject(message.stack[j], options);
            }
            return object;
        };

        /**
         * Converts this DebugStatus to JSON.
         * @function toJSON
         * @memberof api.DebugStatus
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        DebugStatus.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return DebugStatus;
    })();

    api.StackFrame = (function() {

        /**
         * Properties of a StackFrame.
         * @memberof api
         * @interface IStackFrame
         * @property {string|null} ["function"] StackFrame function
         * @property {number|null} [line] StackFrame line
         */

        /**
         * Constructs a new StackFrame.
         * @memberof api
         * @classdesc Represents a StackFrame.
         * @implements IStackFrame
         * @constructor
         * @param {api.IStackFrame=} [properties] Properties to set
         */
        function StackFrame(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * StackFrame function.
         * @member {string} function
         * @memberof api.StackFrame
         * @instance
         */
        StackFrame.prototype["function"] = "";

        /**
         * StackFrame line.
         * @member {number} line
         * @memberof api.StackFrame
         * @instance
         */
        StackFrame.prototype.line = 0;

        /**
         * Creates a new StackFrame instance using the specified properties.
         * @function create
         * @memberof api.StackFrame
         * @static
         * @param {api.IStackFrame=} [properties] Properties to set
         * @returns {api.StackFrame} StackFrame instance
         */
        StackFrame.create = function create(properties) {
            return new StackFrame(properties);
        };

        /**
         * Encodes the specified StackFrame message. Does not implicitly {@link api.StackFrame.verify|verify} messages.
         * @function encode
         * @memberof api.StackFrame
         * @static
         * @param {api.IStackFrame} message StackFrame message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        StackFrame.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message["function"] != null && message.hasOwnProperty("function"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message["function"]);
            if (message.line != null && message.hasOwnProperty("line"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.line);
            return writer;
        };

        /**
         * Encodes the specified StackFrame message, length delimited. Does not implicitly {@link api.StackFrame.verify|verify} messages.
         * @function encodeDelimited
         * @memberof api.StackFrame
         * @static
         * @param {api.IStackFrame} message StackFrame message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        StackFrame.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a StackFrame message from the specified reader or buffer.
         * @function decode
         * @memberof api.StackFrame
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {api.StackFrame} StackFrame
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        StackFrame.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.api.StackFrame();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message["function"] = reader.string();
                    break;
                case 2:
                    message.line = reader.uint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a StackFrame message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof api.StackFrame
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {api.StackFrame} StackFrame
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        StackFrame.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a StackFrame message.
         * @function verify
         * @memberof api.StackFrame
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        StackFrame.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message["function"] != null && message.hasOwnProperty("function"))
                if (!$util.isString(message["function"]))
                    return "function: string expected";
            if (message.line != null && message.hasOwnProperty("line"))
                if (!$util.isInteger(message.line))
                    return "line: integer expected";
            return null;
        };

        /**
         * Creates a StackFrame message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof api.StackFrame
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {api.StackFrame} StackFrame
         */
        StackFrame.fromObject = function fromObject(object) {
            if (object instanceof $root.api.StackFrame)
                return object;
            var message = new $root.api.StackFrame();
            if (object["function"] != null)
                message["function"] = String(object["function"]);
            if (object.line != null)
                message.line = object.line >>> 0;
            return message;
        };

        /**
         * Creates a plain object from a StackFrame message. Also converts values to other types if specified.
         * @function toObject
         * @memberof api.StackFrame
         * @static
         * @param {api.StackFrame} message StackFrame
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        StackFrame.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object["function"] = "";
                object.line = 0;
            }
            if (message["function"] != null && message.hasOwnProperty("function"))
                object["function"] = message["function"];
            if (message.line != null && message.hasOwnProperty("line"))
                object.line = message.line;
            return object;
        };

        /**
         * Converts this StackFrame to JSON.
         * @function toJSON
         * @memberof api.StackFrame
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        StackFrame.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return StackFrame;
    })();

    api.ContainedTest = (function() {

        /**
         * Properties of a ContainedTest.
         * @memberof api
         * @interface IContainedTest
         * @property {api.IFile|null} [suite] ContainedTest suite
         * @property {Array.<api.IFile>|null} [project] ContainedTest project
         */

        /**
         * Constructs a new ContainedTest.
         * @memberof api
         * @classdesc Represents a ContainedTest.
         * @implements IContainedTest
         * @constructor
         * @param {api.IContainedTest=} [properties] Properties to set
         */
        function ContainedTest(properties) {
            this.project = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ContainedTest suite.
         * @member {api.IFile|null|undefined} suite
         * @memberof api.ContainedTest
         * @instance
         */
        ContainedTest.prototype.suite = null;

        /**
         * ContainedTest project.
         * @member {Array.<api.IFile>} project
         * @memberof api.ContainedTest
         * @instance
         */
        ContainedTest.prototype.project = $util.emptyArray;

        /**
         * Creates a new ContainedTest instance using the specified properties.
         * @function create
         * @memberof api.ContainedTest
         * @static
         * @param {api.IContainedTest=} [properties] Properties to set
         * @returns {api.ContainedTest} ContainedTest instance
         */
        ContainedTest.create = function create(properties) {
            return new ContainedTest(properties);
        };

        /**
         * Encodes the specified ContainedTest message. Does not implicitly {@link api.ContainedTest.verify|verify} messages.
         * @function encode
         * @memberof api.ContainedTest
         * @static
         * @param {api.IContainedTest} message ContainedTest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ContainedTest.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.suite != null && message.hasOwnProperty("suite"))
                $root.api.File.encode(message.suite, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.project != null && message.project.length)
                for (var i = 0; i < message.project.length; ++i)
                    $root.api.File.encode(message.project[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified ContainedTest message, length delimited. Does not implicitly {@link api.ContainedTest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof api.ContainedTest
         * @static
         * @param {api.IContainedTest} message ContainedTest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ContainedTest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ContainedTest message from the specified reader or buffer.
         * @function decode
         * @memberof api.ContainedTest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {api.ContainedTest} ContainedTest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ContainedTest.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.api.ContainedTest();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.suite = $root.api.File.decode(reader, reader.uint32());
                    break;
                case 2:
                    if (!(message.project && message.project.length))
                        message.project = [];
                    message.project.push($root.api.File.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a ContainedTest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof api.ContainedTest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {api.ContainedTest} ContainedTest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ContainedTest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ContainedTest message.
         * @function verify
         * @memberof api.ContainedTest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ContainedTest.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.suite != null && message.hasOwnProperty("suite")) {
                var error = $root.api.File.verify(message.suite);
                if (error)
                    return "suite." + error;
            }
            if (message.project != null && message.hasOwnProperty("project")) {
                if (!Array.isArray(message.project))
                    return "project: array expected";
                for (var i = 0; i < message.project.length; ++i) {
                    var error = $root.api.File.verify(message.project[i]);
                    if (error)
                        return "project." + error;
                }
            }
            return null;
        };

        /**
         * Creates a ContainedTest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof api.ContainedTest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {api.ContainedTest} ContainedTest
         */
        ContainedTest.fromObject = function fromObject(object) {
            if (object instanceof $root.api.ContainedTest)
                return object;
            var message = new $root.api.ContainedTest();
            if (object.suite != null) {
                if (typeof object.suite !== "object")
                    throw TypeError(".api.ContainedTest.suite: object expected");
                message.suite = $root.api.File.fromObject(object.suite);
            }
            if (object.project) {
                if (!Array.isArray(object.project))
                    throw TypeError(".api.ContainedTest.project: array expected");
                message.project = [];
                for (var i = 0; i < object.project.length; ++i) {
                    if (typeof object.project[i] !== "object")
                        throw TypeError(".api.ContainedTest.project: object expected");
                    message.project[i] = $root.api.File.fromObject(object.project[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a ContainedTest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof api.ContainedTest
         * @static
         * @param {api.ContainedTest} message ContainedTest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ContainedTest.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.project = [];
            if (options.defaults)
                object.suite = null;
            if (message.suite != null && message.hasOwnProperty("suite"))
                object.suite = $root.api.File.toObject(message.suite, options);
            if (message.project && message.project.length) {
                object.project = [];
                for (var j = 0; j < message.project.length; ++j)
                    object.project[j] = $root.api.File.toObject(message.project[j], options);
            }
            return object;
        };

        /**
         * Converts this ContainedTest to JSON.
         * @function toJSON
         * @memberof api.ContainedTest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ContainedTest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return ContainedTest;
    })();

    api.TestResult = (function() {

        /**
         * Properties of a TestResult.
         * @memberof api
         * @interface ITestResult
         * @property {boolean|null} [passed] TestResult passed
         * @property {string|null} [stderr] TestResult stderr
         * @property {Array.<api.ITestFailure>|null} [fails] TestResult fails
         */

        /**
         * Constructs a new TestResult.
         * @memberof api
         * @classdesc Represents a TestResult.
         * @implements ITestResult
         * @constructor
         * @param {api.ITestResult=} [properties] Properties to set
         */
        function TestResult(properties) {
            this.fails = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * TestResult passed.
         * @member {boolean} passed
         * @memberof api.TestResult
         * @instance
         */
        TestResult.prototype.passed = false;

        /**
         * TestResult stderr.
         * @member {string} stderr
         * @memberof api.TestResult
         * @instance
         */
        TestResult.prototype.stderr = "";

        /**
         * TestResult fails.
         * @member {Array.<api.ITestFailure>} fails
         * @memberof api.TestResult
         * @instance
         */
        TestResult.prototype.fails = $util.emptyArray;

        /**
         * Creates a new TestResult instance using the specified properties.
         * @function create
         * @memberof api.TestResult
         * @static
         * @param {api.ITestResult=} [properties] Properties to set
         * @returns {api.TestResult} TestResult instance
         */
        TestResult.create = function create(properties) {
            return new TestResult(properties);
        };

        /**
         * Encodes the specified TestResult message. Does not implicitly {@link api.TestResult.verify|verify} messages.
         * @function encode
         * @memberof api.TestResult
         * @static
         * @param {api.ITestResult} message TestResult message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TestResult.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.passed != null && message.hasOwnProperty("passed"))
                writer.uint32(/* id 1, wireType 0 =*/8).bool(message.passed);
            if (message.stderr != null && message.hasOwnProperty("stderr"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.stderr);
            if (message.fails != null && message.fails.length)
                for (var i = 0; i < message.fails.length; ++i)
                    $root.api.TestFailure.encode(message.fails[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified TestResult message, length delimited. Does not implicitly {@link api.TestResult.verify|verify} messages.
         * @function encodeDelimited
         * @memberof api.TestResult
         * @static
         * @param {api.ITestResult} message TestResult message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TestResult.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a TestResult message from the specified reader or buffer.
         * @function decode
         * @memberof api.TestResult
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {api.TestResult} TestResult
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TestResult.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.api.TestResult();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.passed = reader.bool();
                    break;
                case 2:
                    message.stderr = reader.string();
                    break;
                case 3:
                    if (!(message.fails && message.fails.length))
                        message.fails = [];
                    message.fails.push($root.api.TestFailure.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a TestResult message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof api.TestResult
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {api.TestResult} TestResult
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TestResult.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a TestResult message.
         * @function verify
         * @memberof api.TestResult
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        TestResult.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.passed != null && message.hasOwnProperty("passed"))
                if (typeof message.passed !== "boolean")
                    return "passed: boolean expected";
            if (message.stderr != null && message.hasOwnProperty("stderr"))
                if (!$util.isString(message.stderr))
                    return "stderr: string expected";
            if (message.fails != null && message.hasOwnProperty("fails")) {
                if (!Array.isArray(message.fails))
                    return "fails: array expected";
                for (var i = 0; i < message.fails.length; ++i) {
                    var error = $root.api.TestFailure.verify(message.fails[i]);
                    if (error)
                        return "fails." + error;
                }
            }
            return null;
        };

        /**
         * Creates a TestResult message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof api.TestResult
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {api.TestResult} TestResult
         */
        TestResult.fromObject = function fromObject(object) {
            if (object instanceof $root.api.TestResult)
                return object;
            var message = new $root.api.TestResult();
            if (object.passed != null)
                message.passed = Boolean(object.passed);
            if (object.stderr != null)
                message.stderr = String(object.stderr);
            if (object.fails) {
                if (!Array.isArray(object.fails))
                    throw TypeError(".api.TestResult.fails: array expected");
                message.fails = [];
                for (var i = 0; i < object.fails.length; ++i) {
                    if (typeof object.fails[i] !== "object")
                        throw TypeError(".api.TestResult.fails: object expected");
                    message.fails[i] = $root.api.TestFailure.fromObject(object.fails[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a TestResult message. Also converts values to other types if specified.
         * @function toObject
         * @memberof api.TestResult
         * @static
         * @param {api.TestResult} message TestResult
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        TestResult.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.fails = [];
            if (options.defaults) {
                object.passed = false;
                object.stderr = "";
            }
            if (message.passed != null && message.hasOwnProperty("passed"))
                object.passed = message.passed;
            if (message.stderr != null && message.hasOwnProperty("stderr"))
                object.stderr = message.stderr;
            if (message.fails && message.fails.length) {
                object.fails = [];
                for (var j = 0; j < message.fails.length; ++j)
                    object.fails[j] = $root.api.TestFailure.toObject(message.fails[j], options);
            }
            return object;
        };

        /**
         * Converts this TestResult to JSON.
         * @function toJSON
         * @memberof api.TestResult
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        TestResult.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return TestResult;
    })();

    api.TestFailure = (function() {

        /**
         * Properties of a TestFailure.
         * @memberof api
         * @interface ITestFailure
         * @property {string|null} [name] TestFailure name
         * @property {string|null} [trace] TestFailure trace
         */

        /**
         * Constructs a new TestFailure.
         * @memberof api
         * @classdesc Represents a TestFailure.
         * @implements ITestFailure
         * @constructor
         * @param {api.ITestFailure=} [properties] Properties to set
         */
        function TestFailure(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * TestFailure name.
         * @member {string} name
         * @memberof api.TestFailure
         * @instance
         */
        TestFailure.prototype.name = "";

        /**
         * TestFailure trace.
         * @member {string} trace
         * @memberof api.TestFailure
         * @instance
         */
        TestFailure.prototype.trace = "";

        /**
         * Creates a new TestFailure instance using the specified properties.
         * @function create
         * @memberof api.TestFailure
         * @static
         * @param {api.ITestFailure=} [properties] Properties to set
         * @returns {api.TestFailure} TestFailure instance
         */
        TestFailure.create = function create(properties) {
            return new TestFailure(properties);
        };

        /**
         * Encodes the specified TestFailure message. Does not implicitly {@link api.TestFailure.verify|verify} messages.
         * @function encode
         * @memberof api.TestFailure
         * @static
         * @param {api.ITestFailure} message TestFailure message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TestFailure.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.name != null && message.hasOwnProperty("name"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);
            if (message.trace != null && message.hasOwnProperty("trace"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.trace);
            return writer;
        };

        /**
         * Encodes the specified TestFailure message, length delimited. Does not implicitly {@link api.TestFailure.verify|verify} messages.
         * @function encodeDelimited
         * @memberof api.TestFailure
         * @static
         * @param {api.ITestFailure} message TestFailure message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TestFailure.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a TestFailure message from the specified reader or buffer.
         * @function decode
         * @memberof api.TestFailure
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {api.TestFailure} TestFailure
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TestFailure.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.api.TestFailure();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.name = reader.string();
                    break;
                case 2:
                    message.trace = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a TestFailure message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof api.TestFailure
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {api.TestFailure} TestFailure
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TestFailure.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a TestFailure message.
         * @function verify
         * @memberof api.TestFailure
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        TestFailure.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.name != null && message.hasOwnProperty("name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            if (message.trace != null && message.hasOwnProperty("trace"))
                if (!$util.isString(message.trace))
                    return "trace: string expected";
            return null;
        };

        /**
         * Creates a TestFailure message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof api.TestFailure
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {api.TestFailure} TestFailure
         */
        TestFailure.fromObject = function fromObject(object) {
            if (object instanceof $root.api.TestFailure)
                return object;
            var message = new $root.api.TestFailure();
            if (object.name != null)
                message.name = String(object.name);
            if (object.trace != null)
                message.trace = String(object.trace);
            return message;
        };

        /**
         * Creates a plain object from a TestFailure message. Also converts values to other types if specified.
         * @function toObject
         * @memberof api.TestFailure
         * @static
         * @param {api.TestFailure} message TestFailure
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        TestFailure.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.name = "";
                object.trace = "";
            }
            if (message.name != null && message.hasOwnProperty("name"))
                object.name = message.name;
            if (message.trace != null && message.hasOwnProperty("trace"))
                object.trace = message.trace;
            return object;
        };

        /**
         * Converts this TestFailure to JSON.
         * @function toJSON
         * @memberof api.TestFailure
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        TestFailure.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return TestFailure;
    })();

    api.ResizeTerm = (function() {

        /**
         * Properties of a ResizeTerm.
         * @memberof api
         * @interface IResizeTerm
         * @property {number|null} [rows] ResizeTerm rows
         * @property {number|null} [cols] ResizeTerm cols
         */

        /**
         * Constructs a new ResizeTerm.
         * @memberof api
         * @classdesc Represents a ResizeTerm.
         * @implements IResizeTerm
         * @constructor
         * @param {api.IResizeTerm=} [properties] Properties to set
         */
        function ResizeTerm(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ResizeTerm rows.
         * @member {number} rows
         * @memberof api.ResizeTerm
         * @instance
         */
        ResizeTerm.prototype.rows = 0;

        /**
         * ResizeTerm cols.
         * @member {number} cols
         * @memberof api.ResizeTerm
         * @instance
         */
        ResizeTerm.prototype.cols = 0;

        /**
         * Creates a new ResizeTerm instance using the specified properties.
         * @function create
         * @memberof api.ResizeTerm
         * @static
         * @param {api.IResizeTerm=} [properties] Properties to set
         * @returns {api.ResizeTerm} ResizeTerm instance
         */
        ResizeTerm.create = function create(properties) {
            return new ResizeTerm(properties);
        };

        /**
         * Encodes the specified ResizeTerm message. Does not implicitly {@link api.ResizeTerm.verify|verify} messages.
         * @function encode
         * @memberof api.ResizeTerm
         * @static
         * @param {api.IResizeTerm} message ResizeTerm message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ResizeTerm.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.rows != null && message.hasOwnProperty("rows"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.rows);
            if (message.cols != null && message.hasOwnProperty("cols"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.cols);
            return writer;
        };

        /**
         * Encodes the specified ResizeTerm message, length delimited. Does not implicitly {@link api.ResizeTerm.verify|verify} messages.
         * @function encodeDelimited
         * @memberof api.ResizeTerm
         * @static
         * @param {api.IResizeTerm} message ResizeTerm message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ResizeTerm.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ResizeTerm message from the specified reader or buffer.
         * @function decode
         * @memberof api.ResizeTerm
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {api.ResizeTerm} ResizeTerm
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ResizeTerm.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.api.ResizeTerm();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.rows = reader.uint32();
                    break;
                case 2:
                    message.cols = reader.uint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a ResizeTerm message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof api.ResizeTerm
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {api.ResizeTerm} ResizeTerm
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ResizeTerm.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ResizeTerm message.
         * @function verify
         * @memberof api.ResizeTerm
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ResizeTerm.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.rows != null && message.hasOwnProperty("rows"))
                if (!$util.isInteger(message.rows))
                    return "rows: integer expected";
            if (message.cols != null && message.hasOwnProperty("cols"))
                if (!$util.isInteger(message.cols))
                    return "cols: integer expected";
            return null;
        };

        /**
         * Creates a ResizeTerm message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof api.ResizeTerm
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {api.ResizeTerm} ResizeTerm
         */
        ResizeTerm.fromObject = function fromObject(object) {
            if (object instanceof $root.api.ResizeTerm)
                return object;
            var message = new $root.api.ResizeTerm();
            if (object.rows != null)
                message.rows = object.rows >>> 0;
            if (object.cols != null)
                message.cols = object.cols >>> 0;
            return message;
        };

        /**
         * Creates a plain object from a ResizeTerm message. Also converts values to other types if specified.
         * @function toObject
         * @memberof api.ResizeTerm
         * @static
         * @param {api.ResizeTerm} message ResizeTerm
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ResizeTerm.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.rows = 0;
                object.cols = 0;
            }
            if (message.rows != null && message.hasOwnProperty("rows"))
                object.rows = message.rows;
            if (message.cols != null && message.hasOwnProperty("cols"))
                object.cols = message.cols;
            return object;
        };

        /**
         * Converts this ResizeTerm to JSON.
         * @function toJSON
         * @memberof api.ResizeTerm
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ResizeTerm.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return ResizeTerm;
    })();

    api.SaneTerm = (function() {

        /**
         * Properties of a SaneTerm.
         * @memberof api
         * @interface ISaneTerm
         */

        /**
         * Constructs a new SaneTerm.
         * @memberof api
         * @classdesc Represents a SaneTerm.
         * @implements ISaneTerm
         * @constructor
         * @param {api.ISaneTerm=} [properties] Properties to set
         */
        function SaneTerm(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new SaneTerm instance using the specified properties.
         * @function create
         * @memberof api.SaneTerm
         * @static
         * @param {api.ISaneTerm=} [properties] Properties to set
         * @returns {api.SaneTerm} SaneTerm instance
         */
        SaneTerm.create = function create(properties) {
            return new SaneTerm(properties);
        };

        /**
         * Encodes the specified SaneTerm message. Does not implicitly {@link api.SaneTerm.verify|verify} messages.
         * @function encode
         * @memberof api.SaneTerm
         * @static
         * @param {api.ISaneTerm} message SaneTerm message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SaneTerm.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified SaneTerm message, length delimited. Does not implicitly {@link api.SaneTerm.verify|verify} messages.
         * @function encodeDelimited
         * @memberof api.SaneTerm
         * @static
         * @param {api.ISaneTerm} message SaneTerm message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SaneTerm.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SaneTerm message from the specified reader or buffer.
         * @function decode
         * @memberof api.SaneTerm
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {api.SaneTerm} SaneTerm
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SaneTerm.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.api.SaneTerm();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a SaneTerm message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof api.SaneTerm
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {api.SaneTerm} SaneTerm
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SaneTerm.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SaneTerm message.
         * @function verify
         * @memberof api.SaneTerm
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SaneTerm.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a SaneTerm message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof api.SaneTerm
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {api.SaneTerm} SaneTerm
         */
        SaneTerm.fromObject = function fromObject(object) {
            if (object instanceof $root.api.SaneTerm)
                return object;
            return new $root.api.SaneTerm();
        };

        /**
         * Creates a plain object from a SaneTerm message. Also converts values to other types if specified.
         * @function toObject
         * @memberof api.SaneTerm
         * @static
         * @param {api.SaneTerm} message SaneTerm
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SaneTerm.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this SaneTerm to JSON.
         * @function toJSON
         * @memberof api.SaneTerm
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SaneTerm.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return SaneTerm;
    })();

    api.LintResults = (function() {

        /**
         * Properties of a LintResults.
         * @memberof api
         * @interface ILintResults
         * @property {Array.<api.ILintResult>|null} [results] LintResults results
         */

        /**
         * Constructs a new LintResults.
         * @memberof api
         * @classdesc Represents a LintResults.
         * @implements ILintResults
         * @constructor
         * @param {api.ILintResults=} [properties] Properties to set
         */
        function LintResults(properties) {
            this.results = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * LintResults results.
         * @member {Array.<api.ILintResult>} results
         * @memberof api.LintResults
         * @instance
         */
        LintResults.prototype.results = $util.emptyArray;

        /**
         * Creates a new LintResults instance using the specified properties.
         * @function create
         * @memberof api.LintResults
         * @static
         * @param {api.ILintResults=} [properties] Properties to set
         * @returns {api.LintResults} LintResults instance
         */
        LintResults.create = function create(properties) {
            return new LintResults(properties);
        };

        /**
         * Encodes the specified LintResults message. Does not implicitly {@link api.LintResults.verify|verify} messages.
         * @function encode
         * @memberof api.LintResults
         * @static
         * @param {api.ILintResults} message LintResults message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LintResults.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.results != null && message.results.length)
                for (var i = 0; i < message.results.length; ++i)
                    $root.api.LintResult.encode(message.results[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified LintResults message, length delimited. Does not implicitly {@link api.LintResults.verify|verify} messages.
         * @function encodeDelimited
         * @memberof api.LintResults
         * @static
         * @param {api.ILintResults} message LintResults message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LintResults.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a LintResults message from the specified reader or buffer.
         * @function decode
         * @memberof api.LintResults
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {api.LintResults} LintResults
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LintResults.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.api.LintResults();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.results && message.results.length))
                        message.results = [];
                    message.results.push($root.api.LintResult.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a LintResults message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof api.LintResults
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {api.LintResults} LintResults
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LintResults.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a LintResults message.
         * @function verify
         * @memberof api.LintResults
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        LintResults.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.results != null && message.hasOwnProperty("results")) {
                if (!Array.isArray(message.results))
                    return "results: array expected";
                for (var i = 0; i < message.results.length; ++i) {
                    var error = $root.api.LintResult.verify(message.results[i]);
                    if (error)
                        return "results." + error;
                }
            }
            return null;
        };

        /**
         * Creates a LintResults message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof api.LintResults
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {api.LintResults} LintResults
         */
        LintResults.fromObject = function fromObject(object) {
            if (object instanceof $root.api.LintResults)
                return object;
            var message = new $root.api.LintResults();
            if (object.results) {
                if (!Array.isArray(object.results))
                    throw TypeError(".api.LintResults.results: array expected");
                message.results = [];
                for (var i = 0; i < object.results.length; ++i) {
                    if (typeof object.results[i] !== "object")
                        throw TypeError(".api.LintResults.results: object expected");
                    message.results[i] = $root.api.LintResult.fromObject(object.results[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a LintResults message. Also converts values to other types if specified.
         * @function toObject
         * @memberof api.LintResults
         * @static
         * @param {api.LintResults} message LintResults
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        LintResults.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.results = [];
            if (message.results && message.results.length) {
                object.results = [];
                for (var j = 0; j < message.results.length; ++j)
                    object.results[j] = $root.api.LintResult.toObject(message.results[j], options);
            }
            return object;
        };

        /**
         * Converts this LintResults to JSON.
         * @function toJSON
         * @memberof api.LintResults
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        LintResults.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return LintResults;
    })();

    api.LintResult = (function() {

        /**
         * Properties of a LintResult.
         * @memberof api
         * @interface ILintResult
         * @property {string|null} [text] LintResult text
         * @property {number|null} [row] LintResult row
         * @property {number|null} [column] LintResult column
         * @property {string|null} [type] LintResult type
         */

        /**
         * Constructs a new LintResult.
         * @memberof api
         * @classdesc Represents a LintResult.
         * @implements ILintResult
         * @constructor
         * @param {api.ILintResult=} [properties] Properties to set
         */
        function LintResult(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * LintResult text.
         * @member {string} text
         * @memberof api.LintResult
         * @instance
         */
        LintResult.prototype.text = "";

        /**
         * LintResult row.
         * @member {number} row
         * @memberof api.LintResult
         * @instance
         */
        LintResult.prototype.row = 0;

        /**
         * LintResult column.
         * @member {number} column
         * @memberof api.LintResult
         * @instance
         */
        LintResult.prototype.column = 0;

        /**
         * LintResult type.
         * @member {string} type
         * @memberof api.LintResult
         * @instance
         */
        LintResult.prototype.type = "";

        /**
         * Creates a new LintResult instance using the specified properties.
         * @function create
         * @memberof api.LintResult
         * @static
         * @param {api.ILintResult=} [properties] Properties to set
         * @returns {api.LintResult} LintResult instance
         */
        LintResult.create = function create(properties) {
            return new LintResult(properties);
        };

        /**
         * Encodes the specified LintResult message. Does not implicitly {@link api.LintResult.verify|verify} messages.
         * @function encode
         * @memberof api.LintResult
         * @static
         * @param {api.ILintResult} message LintResult message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LintResult.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.text != null && message.hasOwnProperty("text"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.text);
            if (message.row != null && message.hasOwnProperty("row"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.row);
            if (message.column != null && message.hasOwnProperty("column"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.column);
            if (message.type != null && message.hasOwnProperty("type"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.type);
            return writer;
        };

        /**
         * Encodes the specified LintResult message, length delimited. Does not implicitly {@link api.LintResult.verify|verify} messages.
         * @function encodeDelimited
         * @memberof api.LintResult
         * @static
         * @param {api.ILintResult} message LintResult message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LintResult.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a LintResult message from the specified reader or buffer.
         * @function decode
         * @memberof api.LintResult
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {api.LintResult} LintResult
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LintResult.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.api.LintResult();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.text = reader.string();
                    break;
                case 2:
                    message.row = reader.int32();
                    break;
                case 3:
                    message.column = reader.int32();
                    break;
                case 4:
                    message.type = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a LintResult message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof api.LintResult
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {api.LintResult} LintResult
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LintResult.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a LintResult message.
         * @function verify
         * @memberof api.LintResult
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        LintResult.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.text != null && message.hasOwnProperty("text"))
                if (!$util.isString(message.text))
                    return "text: string expected";
            if (message.row != null && message.hasOwnProperty("row"))
                if (!$util.isInteger(message.row))
                    return "row: integer expected";
            if (message.column != null && message.hasOwnProperty("column"))
                if (!$util.isInteger(message.column))
                    return "column: integer expected";
            if (message.type != null && message.hasOwnProperty("type"))
                if (!$util.isString(message.type))
                    return "type: string expected";
            return null;
        };

        /**
         * Creates a LintResult message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof api.LintResult
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {api.LintResult} LintResult
         */
        LintResult.fromObject = function fromObject(object) {
            if (object instanceof $root.api.LintResult)
                return object;
            var message = new $root.api.LintResult();
            if (object.text != null)
                message.text = String(object.text);
            if (object.row != null)
                message.row = object.row | 0;
            if (object.column != null)
                message.column = object.column | 0;
            if (object.type != null)
                message.type = String(object.type);
            return message;
        };

        /**
         * Creates a plain object from a LintResult message. Also converts values to other types if specified.
         * @function toObject
         * @memberof api.LintResult
         * @static
         * @param {api.LintResult} message LintResult
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        LintResult.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.text = "";
                object.row = 0;
                object.column = 0;
                object.type = "";
            }
            if (message.text != null && message.hasOwnProperty("text"))
                object.text = message.text;
            if (message.row != null && message.hasOwnProperty("row"))
                object.row = message.row;
            if (message.column != null && message.hasOwnProperty("column"))
                object.column = message.column;
            if (message.type != null && message.hasOwnProperty("type"))
                object.type = message.type;
            return object;
        };

        /**
         * Converts this LintResult to JSON.
         * @function toJSON
         * @memberof api.LintResult
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        LintResult.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return LintResult;
    })();

    api.OK = (function() {

        /**
         * Properties of a OK.
         * @memberof api
         * @interface IOK
         */

        /**
         * Constructs a new OK.
         * @memberof api
         * @classdesc Represents a OK.
         * @implements IOK
         * @constructor
         * @param {api.IOK=} [properties] Properties to set
         */
        function OK(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new OK instance using the specified properties.
         * @function create
         * @memberof api.OK
         * @static
         * @param {api.IOK=} [properties] Properties to set
         * @returns {api.OK} OK instance
         */
        OK.create = function create(properties) {
            return new OK(properties);
        };

        /**
         * Encodes the specified OK message. Does not implicitly {@link api.OK.verify|verify} messages.
         * @function encode
         * @memberof api.OK
         * @static
         * @param {api.IOK} message OK message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        OK.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified OK message, length delimited. Does not implicitly {@link api.OK.verify|verify} messages.
         * @function encodeDelimited
         * @memberof api.OK
         * @static
         * @param {api.IOK} message OK message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        OK.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a OK message from the specified reader or buffer.
         * @function decode
         * @memberof api.OK
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {api.OK} OK
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        OK.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.api.OK();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a OK message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof api.OK
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {api.OK} OK
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        OK.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a OK message.
         * @function verify
         * @memberof api.OK
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        OK.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a OK message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof api.OK
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {api.OK} OK
         */
        OK.fromObject = function fromObject(object) {
            if (object instanceof $root.api.OK)
                return object;
            return new $root.api.OK();
        };

        /**
         * Creates a plain object from a OK message. Also converts values to other types if specified.
         * @function toObject
         * @memberof api.OK
         * @static
         * @param {api.OK} message OK
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        OK.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this OK to JSON.
         * @function toJSON
         * @memberof api.OK
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        OK.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return OK;
    })();

    api.Move = (function() {

        /**
         * Properties of a Move.
         * @memberof api
         * @interface IMove
         * @property {string|null} [oldPath] Move oldPath
         * @property {string|null} [newPath] Move newPath
         */

        /**
         * Constructs a new Move.
         * @memberof api
         * @classdesc Represents a Move.
         * @implements IMove
         * @constructor
         * @param {api.IMove=} [properties] Properties to set
         */
        function Move(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Move oldPath.
         * @member {string} oldPath
         * @memberof api.Move
         * @instance
         */
        Move.prototype.oldPath = "";

        /**
         * Move newPath.
         * @member {string} newPath
         * @memberof api.Move
         * @instance
         */
        Move.prototype.newPath = "";

        /**
         * Creates a new Move instance using the specified properties.
         * @function create
         * @memberof api.Move
         * @static
         * @param {api.IMove=} [properties] Properties to set
         * @returns {api.Move} Move instance
         */
        Move.create = function create(properties) {
            return new Move(properties);
        };

        /**
         * Encodes the specified Move message. Does not implicitly {@link api.Move.verify|verify} messages.
         * @function encode
         * @memberof api.Move
         * @static
         * @param {api.IMove} message Move message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Move.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.oldPath != null && message.hasOwnProperty("oldPath"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.oldPath);
            if (message.newPath != null && message.hasOwnProperty("newPath"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.newPath);
            return writer;
        };

        /**
         * Encodes the specified Move message, length delimited. Does not implicitly {@link api.Move.verify|verify} messages.
         * @function encodeDelimited
         * @memberof api.Move
         * @static
         * @param {api.IMove} message Move message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Move.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Move message from the specified reader or buffer.
         * @function decode
         * @memberof api.Move
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {api.Move} Move
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Move.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.api.Move();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.oldPath = reader.string();
                    break;
                case 2:
                    message.newPath = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Move message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof api.Move
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {api.Move} Move
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Move.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Move message.
         * @function verify
         * @memberof api.Move
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Move.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.oldPath != null && message.hasOwnProperty("oldPath"))
                if (!$util.isString(message.oldPath))
                    return "oldPath: string expected";
            if (message.newPath != null && message.hasOwnProperty("newPath"))
                if (!$util.isString(message.newPath))
                    return "newPath: string expected";
            return null;
        };

        /**
         * Creates a Move message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof api.Move
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {api.Move} Move
         */
        Move.fromObject = function fromObject(object) {
            if (object instanceof $root.api.Move)
                return object;
            var message = new $root.api.Move();
            if (object.oldPath != null)
                message.oldPath = String(object.oldPath);
            if (object.newPath != null)
                message.newPath = String(object.newPath);
            return message;
        };

        /**
         * Creates a plain object from a Move message. Also converts values to other types if specified.
         * @function toObject
         * @memberof api.Move
         * @static
         * @param {api.Move} message Move
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Move.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.oldPath = "";
                object.newPath = "";
            }
            if (message.oldPath != null && message.hasOwnProperty("oldPath"))
                object.oldPath = message.oldPath;
            if (message.newPath != null && message.hasOwnProperty("newPath"))
                object.newPath = message.newPath;
            return object;
        };

        /**
         * Converts this Move to JSON.
         * @function toJSON
         * @memberof api.Move
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Move.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Move;
    })();

    api.Files = (function() {

        /**
         * Properties of a Files.
         * @memberof api
         * @interface IFiles
         * @property {Array.<api.IFile>|null} [files] Files files
         */

        /**
         * Constructs a new Files.
         * @memberof api
         * @classdesc Represents a Files.
         * @implements IFiles
         * @constructor
         * @param {api.IFiles=} [properties] Properties to set
         */
        function Files(properties) {
            this.files = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Files files.
         * @member {Array.<api.IFile>} files
         * @memberof api.Files
         * @instance
         */
        Files.prototype.files = $util.emptyArray;

        /**
         * Creates a new Files instance using the specified properties.
         * @function create
         * @memberof api.Files
         * @static
         * @param {api.IFiles=} [properties] Properties to set
         * @returns {api.Files} Files instance
         */
        Files.create = function create(properties) {
            return new Files(properties);
        };

        /**
         * Encodes the specified Files message. Does not implicitly {@link api.Files.verify|verify} messages.
         * @function encode
         * @memberof api.Files
         * @static
         * @param {api.IFiles} message Files message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Files.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.files != null && message.files.length)
                for (var i = 0; i < message.files.length; ++i)
                    $root.api.File.encode(message.files[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified Files message, length delimited. Does not implicitly {@link api.Files.verify|verify} messages.
         * @function encodeDelimited
         * @memberof api.Files
         * @static
         * @param {api.IFiles} message Files message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Files.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Files message from the specified reader or buffer.
         * @function decode
         * @memberof api.Files
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {api.Files} Files
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Files.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.api.Files();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.files && message.files.length))
                        message.files = [];
                    message.files.push($root.api.File.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Files message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof api.Files
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {api.Files} Files
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Files.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Files message.
         * @function verify
         * @memberof api.Files
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Files.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.files != null && message.hasOwnProperty("files")) {
                if (!Array.isArray(message.files))
                    return "files: array expected";
                for (var i = 0; i < message.files.length; ++i) {
                    var error = $root.api.File.verify(message.files[i]);
                    if (error)
                        return "files." + error;
                }
            }
            return null;
        };

        /**
         * Creates a Files message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof api.Files
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {api.Files} Files
         */
        Files.fromObject = function fromObject(object) {
            if (object instanceof $root.api.Files)
                return object;
            var message = new $root.api.Files();
            if (object.files) {
                if (!Array.isArray(object.files))
                    throw TypeError(".api.Files.files: array expected");
                message.files = [];
                for (var i = 0; i < object.files.length; ++i) {
                    if (typeof object.files[i] !== "object")
                        throw TypeError(".api.Files.files: object expected");
                    message.files[i] = $root.api.File.fromObject(object.files[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a Files message. Also converts values to other types if specified.
         * @function toObject
         * @memberof api.Files
         * @static
         * @param {api.Files} message Files
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Files.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.files = [];
            if (message.files && message.files.length) {
                object.files = [];
                for (var j = 0; j < message.files.length; ++j)
                    object.files[j] = $root.api.File.toObject(message.files[j], options);
            }
            return object;
        };

        /**
         * Converts this Files to JSON.
         * @function toJSON
         * @memberof api.Files
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Files.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Files;
    })();

    api.File = (function() {

        /**
         * Properties of a File.
         * @memberof api
         * @interface IFile
         * @property {string|null} [path] File path
         * @property {api.File.Type|null} [type] File type
         * @property {Uint8Array|null} [content] File content
         */

        /**
         * Constructs a new File.
         * @memberof api
         * @classdesc Represents a File.
         * @implements IFile
         * @constructor
         * @param {api.IFile=} [properties] Properties to set
         */
        function File(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * File path.
         * @member {string} path
         * @memberof api.File
         * @instance
         */
        File.prototype.path = "";

        /**
         * File type.
         * @member {api.File.Type} type
         * @memberof api.File
         * @instance
         */
        File.prototype.type = 0;

        /**
         * File content.
         * @member {Uint8Array} content
         * @memberof api.File
         * @instance
         */
        File.prototype.content = $util.newBuffer([]);

        /**
         * Creates a new File instance using the specified properties.
         * @function create
         * @memberof api.File
         * @static
         * @param {api.IFile=} [properties] Properties to set
         * @returns {api.File} File instance
         */
        File.create = function create(properties) {
            return new File(properties);
        };

        /**
         * Encodes the specified File message. Does not implicitly {@link api.File.verify|verify} messages.
         * @function encode
         * @memberof api.File
         * @static
         * @param {api.IFile} message File message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        File.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.path != null && message.hasOwnProperty("path"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.path);
            if (message.type != null && message.hasOwnProperty("type"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.type);
            if (message.content != null && message.hasOwnProperty("content"))
                writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.content);
            return writer;
        };

        /**
         * Encodes the specified File message, length delimited. Does not implicitly {@link api.File.verify|verify} messages.
         * @function encodeDelimited
         * @memberof api.File
         * @static
         * @param {api.IFile} message File message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        File.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a File message from the specified reader or buffer.
         * @function decode
         * @memberof api.File
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {api.File} File
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        File.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.api.File();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.path = reader.string();
                    break;
                case 2:
                    message.type = reader.int32();
                    break;
                case 3:
                    message.content = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a File message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof api.File
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {api.File} File
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        File.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a File message.
         * @function verify
         * @memberof api.File
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        File.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.path != null && message.hasOwnProperty("path"))
                if (!$util.isString(message.path))
                    return "path: string expected";
            if (message.type != null && message.hasOwnProperty("type"))
                switch (message.type) {
                default:
                    return "type: enum value expected";
                case 0:
                case 1:
                    break;
                }
            if (message.content != null && message.hasOwnProperty("content"))
                if (!(message.content && typeof message.content.length === "number" || $util.isString(message.content)))
                    return "content: buffer expected";
            return null;
        };

        /**
         * Creates a File message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof api.File
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {api.File} File
         */
        File.fromObject = function fromObject(object) {
            if (object instanceof $root.api.File)
                return object;
            var message = new $root.api.File();
            if (object.path != null)
                message.path = String(object.path);
            switch (object.type) {
            case "REGULAR":
            case 0:
                message.type = 0;
                break;
            case "DIRECTORY":
            case 1:
                message.type = 1;
                break;
            }
            if (object.content != null)
                if (typeof object.content === "string")
                    $util.base64.decode(object.content, message.content = $util.newBuffer($util.base64.length(object.content)), 0);
                else if (object.content.length)
                    message.content = object.content;
            return message;
        };

        /**
         * Creates a plain object from a File message. Also converts values to other types if specified.
         * @function toObject
         * @memberof api.File
         * @static
         * @param {api.File} message File
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        File.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.path = "";
                object.type = options.enums === String ? "REGULAR" : 0;
                if (options.bytes === String)
                    object.content = "";
                else {
                    object.content = [];
                    if (options.bytes !== Array)
                        object.content = $util.newBuffer(object.content);
                }
            }
            if (message.path != null && message.hasOwnProperty("path"))
                object.path = message.path;
            if (message.type != null && message.hasOwnProperty("type"))
                object.type = options.enums === String ? $root.api.File.Type[message.type] : message.type;
            if (message.content != null && message.hasOwnProperty("content"))
                object.content = options.bytes === String ? $util.base64.encode(message.content, 0, message.content.length) : options.bytes === Array ? Array.prototype.slice.call(message.content) : message.content;
            return object;
        };

        /**
         * Converts this File to JSON.
         * @function toJSON
         * @memberof api.File
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        File.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Type enum.
         * @name api.File.Type
         * @enum {string}
         * @property {number} REGULAR=0 REGULAR value
         * @property {number} DIRECTORY=1 DIRECTORY value
         */
        File.Type = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "REGULAR"] = 0;
            values[valuesById[1] = "DIRECTORY"] = 1;
            return values;
        })();

        return File;
    })();

    api.Clear = (function() {

        /**
         * Properties of a Clear.
         * @memberof api
         * @interface IClear
         */

        /**
         * Constructs a new Clear.
         * @memberof api
         * @classdesc Represents a Clear.
         * @implements IClear
         * @constructor
         * @param {api.IClear=} [properties] Properties to set
         */
        function Clear(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new Clear instance using the specified properties.
         * @function create
         * @memberof api.Clear
         * @static
         * @param {api.IClear=} [properties] Properties to set
         * @returns {api.Clear} Clear instance
         */
        Clear.create = function create(properties) {
            return new Clear(properties);
        };

        /**
         * Encodes the specified Clear message. Does not implicitly {@link api.Clear.verify|verify} messages.
         * @function encode
         * @memberof api.Clear
         * @static
         * @param {api.IClear} message Clear message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Clear.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified Clear message, length delimited. Does not implicitly {@link api.Clear.verify|verify} messages.
         * @function encodeDelimited
         * @memberof api.Clear
         * @static
         * @param {api.IClear} message Clear message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Clear.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Clear message from the specified reader or buffer.
         * @function decode
         * @memberof api.Clear
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {api.Clear} Clear
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Clear.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.api.Clear();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Clear message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof api.Clear
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {api.Clear} Clear
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Clear.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Clear message.
         * @function verify
         * @memberof api.Clear
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Clear.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a Clear message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof api.Clear
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {api.Clear} Clear
         */
        Clear.fromObject = function fromObject(object) {
            if (object instanceof $root.api.Clear)
                return object;
            return new $root.api.Clear();
        };

        /**
         * Creates a plain object from a Clear message. Also converts values to other types if specified.
         * @function toObject
         * @memberof api.Clear
         * @static
         * @param {api.Clear} message Clear
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Clear.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this Clear to JSON.
         * @function toJSON
         * @memberof api.Clear
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Clear.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Clear;
    })();

    api.Toast = (function() {

        /**
         * Properties of a Toast.
         * @memberof api
         * @interface IToast
         * @property {string|null} [text] Toast text
         */

        /**
         * Constructs a new Toast.
         * @memberof api
         * @classdesc Represents a Toast.
         * @implements IToast
         * @constructor
         * @param {api.IToast=} [properties] Properties to set
         */
        function Toast(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Toast text.
         * @member {string} text
         * @memberof api.Toast
         * @instance
         */
        Toast.prototype.text = "";

        /**
         * Creates a new Toast instance using the specified properties.
         * @function create
         * @memberof api.Toast
         * @static
         * @param {api.IToast=} [properties] Properties to set
         * @returns {api.Toast} Toast instance
         */
        Toast.create = function create(properties) {
            return new Toast(properties);
        };

        /**
         * Encodes the specified Toast message. Does not implicitly {@link api.Toast.verify|verify} messages.
         * @function encode
         * @memberof api.Toast
         * @static
         * @param {api.IToast} message Toast message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Toast.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.text != null && message.hasOwnProperty("text"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.text);
            return writer;
        };

        /**
         * Encodes the specified Toast message, length delimited. Does not implicitly {@link api.Toast.verify|verify} messages.
         * @function encodeDelimited
         * @memberof api.Toast
         * @static
         * @param {api.IToast} message Toast message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Toast.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Toast message from the specified reader or buffer.
         * @function decode
         * @memberof api.Toast
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {api.Toast} Toast
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Toast.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.api.Toast();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.text = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Toast message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof api.Toast
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {api.Toast} Toast
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Toast.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Toast message.
         * @function verify
         * @memberof api.Toast
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Toast.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.text != null && message.hasOwnProperty("text"))
                if (!$util.isString(message.text))
                    return "text: string expected";
            return null;
        };

        /**
         * Creates a Toast message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof api.Toast
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {api.Toast} Toast
         */
        Toast.fromObject = function fromObject(object) {
            if (object instanceof $root.api.Toast)
                return object;
            var message = new $root.api.Toast();
            if (object.text != null)
                message.text = String(object.text);
            return message;
        };

        /**
         * Creates a plain object from a Toast message. Also converts values to other types if specified.
         * @function toObject
         * @memberof api.Toast
         * @static
         * @param {api.Toast} message Toast
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Toast.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.text = "";
            if (message.text != null && message.hasOwnProperty("text"))
                object.text = message.text;
            return object;
        };

        /**
         * Converts this Toast to JSON.
         * @function toJSON
         * @memberof api.Toast
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Toast.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Toast;
    })();

    api.RunMain = (function() {

        /**
         * Properties of a RunMain.
         * @memberof api
         * @interface IRunMain
         */

        /**
         * Constructs a new RunMain.
         * @memberof api
         * @classdesc Represents a RunMain.
         * @implements IRunMain
         * @constructor
         * @param {api.IRunMain=} [properties] Properties to set
         */
        function RunMain(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new RunMain instance using the specified properties.
         * @function create
         * @memberof api.RunMain
         * @static
         * @param {api.IRunMain=} [properties] Properties to set
         * @returns {api.RunMain} RunMain instance
         */
        RunMain.create = function create(properties) {
            return new RunMain(properties);
        };

        /**
         * Encodes the specified RunMain message. Does not implicitly {@link api.RunMain.verify|verify} messages.
         * @function encode
         * @memberof api.RunMain
         * @static
         * @param {api.IRunMain} message RunMain message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RunMain.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified RunMain message, length delimited. Does not implicitly {@link api.RunMain.verify|verify} messages.
         * @function encodeDelimited
         * @memberof api.RunMain
         * @static
         * @param {api.IRunMain} message RunMain message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RunMain.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RunMain message from the specified reader or buffer.
         * @function decode
         * @memberof api.RunMain
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {api.RunMain} RunMain
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RunMain.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.api.RunMain();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a RunMain message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof api.RunMain
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {api.RunMain} RunMain
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RunMain.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RunMain message.
         * @function verify
         * @memberof api.RunMain
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RunMain.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a RunMain message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof api.RunMain
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {api.RunMain} RunMain
         */
        RunMain.fromObject = function fromObject(object) {
            if (object instanceof $root.api.RunMain)
                return object;
            return new $root.api.RunMain();
        };

        /**
         * Creates a plain object from a RunMain message. Also converts values to other types if specified.
         * @function toObject
         * @memberof api.RunMain
         * @static
         * @param {api.RunMain} message RunMain
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RunMain.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this RunMain to JSON.
         * @function toJSON
         * @memberof api.RunMain
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RunMain.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return RunMain;
    })();

    api.OpenChannel = (function() {

        /**
         * Properties of an OpenChannel.
         * @memberof api
         * @interface IOpenChannel
         * @property {string|null} [service] OpenChannel service
         * @property {string|null} [name] OpenChannel name
         * @property {api.OpenChannel.Action|null} [action] OpenChannel action
         */

        /**
         * Constructs a new OpenChannel.
         * @memberof api
         * @classdesc Represents an OpenChannel.
         * @implements IOpenChannel
         * @constructor
         * @param {api.IOpenChannel=} [properties] Properties to set
         */
        function OpenChannel(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * OpenChannel service.
         * @member {string} service
         * @memberof api.OpenChannel
         * @instance
         */
        OpenChannel.prototype.service = "";

        /**
         * OpenChannel name.
         * @member {string} name
         * @memberof api.OpenChannel
         * @instance
         */
        OpenChannel.prototype.name = "";

        /**
         * OpenChannel action.
         * @member {api.OpenChannel.Action} action
         * @memberof api.OpenChannel
         * @instance
         */
        OpenChannel.prototype.action = 0;

        /**
         * Creates a new OpenChannel instance using the specified properties.
         * @function create
         * @memberof api.OpenChannel
         * @static
         * @param {api.IOpenChannel=} [properties] Properties to set
         * @returns {api.OpenChannel} OpenChannel instance
         */
        OpenChannel.create = function create(properties) {
            return new OpenChannel(properties);
        };

        /**
         * Encodes the specified OpenChannel message. Does not implicitly {@link api.OpenChannel.verify|verify} messages.
         * @function encode
         * @memberof api.OpenChannel
         * @static
         * @param {api.IOpenChannel} message OpenChannel message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        OpenChannel.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.service != null && message.hasOwnProperty("service"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.service);
            if (message.name != null && message.hasOwnProperty("name"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
            if (message.action != null && message.hasOwnProperty("action"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.action);
            return writer;
        };

        /**
         * Encodes the specified OpenChannel message, length delimited. Does not implicitly {@link api.OpenChannel.verify|verify} messages.
         * @function encodeDelimited
         * @memberof api.OpenChannel
         * @static
         * @param {api.IOpenChannel} message OpenChannel message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        OpenChannel.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an OpenChannel message from the specified reader or buffer.
         * @function decode
         * @memberof api.OpenChannel
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {api.OpenChannel} OpenChannel
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        OpenChannel.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.api.OpenChannel();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.service = reader.string();
                    break;
                case 2:
                    message.name = reader.string();
                    break;
                case 3:
                    message.action = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an OpenChannel message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof api.OpenChannel
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {api.OpenChannel} OpenChannel
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        OpenChannel.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an OpenChannel message.
         * @function verify
         * @memberof api.OpenChannel
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        OpenChannel.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.service != null && message.hasOwnProperty("service"))
                if (!$util.isString(message.service))
                    return "service: string expected";
            if (message.name != null && message.hasOwnProperty("name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            if (message.action != null && message.hasOwnProperty("action"))
                switch (message.action) {
                default:
                    return "action: enum value expected";
                case 0:
                case 1:
                case 2:
                    break;
                }
            return null;
        };

        /**
         * Creates an OpenChannel message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof api.OpenChannel
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {api.OpenChannel} OpenChannel
         */
        OpenChannel.fromObject = function fromObject(object) {
            if (object instanceof $root.api.OpenChannel)
                return object;
            var message = new $root.api.OpenChannel();
            if (object.service != null)
                message.service = String(object.service);
            if (object.name != null)
                message.name = String(object.name);
            switch (object.action) {
            case "CREATE":
            case 0:
                message.action = 0;
                break;
            case "ATTACH":
            case 1:
                message.action = 1;
                break;
            case "ATTACH_OR_CREATE":
            case 2:
                message.action = 2;
                break;
            }
            return message;
        };

        /**
         * Creates a plain object from an OpenChannel message. Also converts values to other types if specified.
         * @function toObject
         * @memberof api.OpenChannel
         * @static
         * @param {api.OpenChannel} message OpenChannel
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        OpenChannel.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.service = "";
                object.name = "";
                object.action = options.enums === String ? "CREATE" : 0;
            }
            if (message.service != null && message.hasOwnProperty("service"))
                object.service = message.service;
            if (message.name != null && message.hasOwnProperty("name"))
                object.name = message.name;
            if (message.action != null && message.hasOwnProperty("action"))
                object.action = options.enums === String ? $root.api.OpenChannel.Action[message.action] : message.action;
            return object;
        };

        /**
         * Converts this OpenChannel to JSON.
         * @function toJSON
         * @memberof api.OpenChannel
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        OpenChannel.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Action enum.
         * @name api.OpenChannel.Action
         * @enum {string}
         * @property {number} CREATE=0 CREATE value
         * @property {number} ATTACH=1 ATTACH value
         * @property {number} ATTACH_OR_CREATE=2 ATTACH_OR_CREATE value
         */
        OpenChannel.Action = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "CREATE"] = 0;
            values[valuesById[1] = "ATTACH"] = 1;
            values[valuesById[2] = "ATTACH_OR_CREATE"] = 2;
            return values;
        })();

        return OpenChannel;
    })();

    api.OpenChannelRes = (function() {

        /**
         * Properties of an OpenChannelRes.
         * @memberof api
         * @interface IOpenChannelRes
         * @property {number|null} [id] OpenChannelRes id
         * @property {api.OpenChannelRes.State|null} [state] OpenChannelRes state
         * @property {string|null} [error] OpenChannelRes error
         */

        /**
         * Constructs a new OpenChannelRes.
         * @memberof api
         * @classdesc Represents an OpenChannelRes.
         * @implements IOpenChannelRes
         * @constructor
         * @param {api.IOpenChannelRes=} [properties] Properties to set
         */
        function OpenChannelRes(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * OpenChannelRes id.
         * @member {number} id
         * @memberof api.OpenChannelRes
         * @instance
         */
        OpenChannelRes.prototype.id = 0;

        /**
         * OpenChannelRes state.
         * @member {api.OpenChannelRes.State} state
         * @memberof api.OpenChannelRes
         * @instance
         */
        OpenChannelRes.prototype.state = 0;

        /**
         * OpenChannelRes error.
         * @member {string} error
         * @memberof api.OpenChannelRes
         * @instance
         */
        OpenChannelRes.prototype.error = "";

        /**
         * Creates a new OpenChannelRes instance using the specified properties.
         * @function create
         * @memberof api.OpenChannelRes
         * @static
         * @param {api.IOpenChannelRes=} [properties] Properties to set
         * @returns {api.OpenChannelRes} OpenChannelRes instance
         */
        OpenChannelRes.create = function create(properties) {
            return new OpenChannelRes(properties);
        };

        /**
         * Encodes the specified OpenChannelRes message. Does not implicitly {@link api.OpenChannelRes.verify|verify} messages.
         * @function encode
         * @memberof api.OpenChannelRes
         * @static
         * @param {api.IOpenChannelRes} message OpenChannelRes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        OpenChannelRes.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && message.hasOwnProperty("id"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.id);
            if (message.state != null && message.hasOwnProperty("state"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.state);
            if (message.error != null && message.hasOwnProperty("error"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.error);
            return writer;
        };

        /**
         * Encodes the specified OpenChannelRes message, length delimited. Does not implicitly {@link api.OpenChannelRes.verify|verify} messages.
         * @function encodeDelimited
         * @memberof api.OpenChannelRes
         * @static
         * @param {api.IOpenChannelRes} message OpenChannelRes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        OpenChannelRes.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an OpenChannelRes message from the specified reader or buffer.
         * @function decode
         * @memberof api.OpenChannelRes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {api.OpenChannelRes} OpenChannelRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        OpenChannelRes.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.api.OpenChannelRes();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.id = reader.int32();
                    break;
                case 2:
                    message.state = reader.int32();
                    break;
                case 3:
                    message.error = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an OpenChannelRes message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof api.OpenChannelRes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {api.OpenChannelRes} OpenChannelRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        OpenChannelRes.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an OpenChannelRes message.
         * @function verify
         * @memberof api.OpenChannelRes
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        OpenChannelRes.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isInteger(message.id))
                    return "id: integer expected";
            if (message.state != null && message.hasOwnProperty("state"))
                switch (message.state) {
                default:
                    return "state: enum value expected";
                case 0:
                case 1:
                case 2:
                    break;
                }
            if (message.error != null && message.hasOwnProperty("error"))
                if (!$util.isString(message.error))
                    return "error: string expected";
            return null;
        };

        /**
         * Creates an OpenChannelRes message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof api.OpenChannelRes
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {api.OpenChannelRes} OpenChannelRes
         */
        OpenChannelRes.fromObject = function fromObject(object) {
            if (object instanceof $root.api.OpenChannelRes)
                return object;
            var message = new $root.api.OpenChannelRes();
            if (object.id != null)
                message.id = object.id | 0;
            switch (object.state) {
            case "CREATED":
            case 0:
                message.state = 0;
                break;
            case "ATTACHED":
            case 1:
                message.state = 1;
                break;
            case "ERROR":
            case 2:
                message.state = 2;
                break;
            }
            if (object.error != null)
                message.error = String(object.error);
            return message;
        };

        /**
         * Creates a plain object from an OpenChannelRes message. Also converts values to other types if specified.
         * @function toObject
         * @memberof api.OpenChannelRes
         * @static
         * @param {api.OpenChannelRes} message OpenChannelRes
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        OpenChannelRes.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.id = 0;
                object.state = options.enums === String ? "CREATED" : 0;
                object.error = "";
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.state != null && message.hasOwnProperty("state"))
                object.state = options.enums === String ? $root.api.OpenChannelRes.State[message.state] : message.state;
            if (message.error != null && message.hasOwnProperty("error"))
                object.error = message.error;
            return object;
        };

        /**
         * Converts this OpenChannelRes to JSON.
         * @function toJSON
         * @memberof api.OpenChannelRes
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        OpenChannelRes.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * State enum.
         * @name api.OpenChannelRes.State
         * @enum {string}
         * @property {number} CREATED=0 CREATED value
         * @property {number} ATTACHED=1 ATTACHED value
         * @property {number} ERROR=2 ERROR value
         */
        OpenChannelRes.State = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "CREATED"] = 0;
            values[valuesById[1] = "ATTACHED"] = 1;
            values[valuesById[2] = "ERROR"] = 2;
            return values;
        })();

        return OpenChannelRes;
    })();

    api.CloseChannel = (function() {

        /**
         * Properties of a CloseChannel.
         * @memberof api
         * @interface ICloseChannel
         * @property {number|null} [id] CloseChannel id
         */

        /**
         * Constructs a new CloseChannel.
         * @memberof api
         * @classdesc Represents a CloseChannel.
         * @implements ICloseChannel
         * @constructor
         * @param {api.ICloseChannel=} [properties] Properties to set
         */
        function CloseChannel(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * CloseChannel id.
         * @member {number} id
         * @memberof api.CloseChannel
         * @instance
         */
        CloseChannel.prototype.id = 0;

        /**
         * Creates a new CloseChannel instance using the specified properties.
         * @function create
         * @memberof api.CloseChannel
         * @static
         * @param {api.ICloseChannel=} [properties] Properties to set
         * @returns {api.CloseChannel} CloseChannel instance
         */
        CloseChannel.create = function create(properties) {
            return new CloseChannel(properties);
        };

        /**
         * Encodes the specified CloseChannel message. Does not implicitly {@link api.CloseChannel.verify|verify} messages.
         * @function encode
         * @memberof api.CloseChannel
         * @static
         * @param {api.ICloseChannel} message CloseChannel message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CloseChannel.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && message.hasOwnProperty("id"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.id);
            return writer;
        };

        /**
         * Encodes the specified CloseChannel message, length delimited. Does not implicitly {@link api.CloseChannel.verify|verify} messages.
         * @function encodeDelimited
         * @memberof api.CloseChannel
         * @static
         * @param {api.ICloseChannel} message CloseChannel message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CloseChannel.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a CloseChannel message from the specified reader or buffer.
         * @function decode
         * @memberof api.CloseChannel
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {api.CloseChannel} CloseChannel
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CloseChannel.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.api.CloseChannel();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.id = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a CloseChannel message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof api.CloseChannel
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {api.CloseChannel} CloseChannel
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CloseChannel.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a CloseChannel message.
         * @function verify
         * @memberof api.CloseChannel
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CloseChannel.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isInteger(message.id))
                    return "id: integer expected";
            return null;
        };

        /**
         * Creates a CloseChannel message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof api.CloseChannel
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {api.CloseChannel} CloseChannel
         */
        CloseChannel.fromObject = function fromObject(object) {
            if (object instanceof $root.api.CloseChannel)
                return object;
            var message = new $root.api.CloseChannel();
            if (object.id != null)
                message.id = object.id | 0;
            return message;
        };

        /**
         * Creates a plain object from a CloseChannel message. Also converts values to other types if specified.
         * @function toObject
         * @memberof api.CloseChannel
         * @static
         * @param {api.CloseChannel} message CloseChannel
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CloseChannel.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.id = 0;
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            return object;
        };

        /**
         * Converts this CloseChannel to JSON.
         * @function toJSON
         * @memberof api.CloseChannel
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CloseChannel.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return CloseChannel;
    })();

    api.ContainerState = (function() {

        /**
         * Properties of a ContainerState.
         * @memberof api
         * @interface IContainerState
         * @property {api.ContainerState.State|null} [state] ContainerState state
         */

        /**
         * Constructs a new ContainerState.
         * @memberof api
         * @classdesc Represents a ContainerState.
         * @implements IContainerState
         * @constructor
         * @param {api.IContainerState=} [properties] Properties to set
         */
        function ContainerState(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ContainerState state.
         * @member {api.ContainerState.State} state
         * @memberof api.ContainerState
         * @instance
         */
        ContainerState.prototype.state = 0;

        /**
         * Creates a new ContainerState instance using the specified properties.
         * @function create
         * @memberof api.ContainerState
         * @static
         * @param {api.IContainerState=} [properties] Properties to set
         * @returns {api.ContainerState} ContainerState instance
         */
        ContainerState.create = function create(properties) {
            return new ContainerState(properties);
        };

        /**
         * Encodes the specified ContainerState message. Does not implicitly {@link api.ContainerState.verify|verify} messages.
         * @function encode
         * @memberof api.ContainerState
         * @static
         * @param {api.IContainerState} message ContainerState message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ContainerState.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.state != null && message.hasOwnProperty("state"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.state);
            return writer;
        };

        /**
         * Encodes the specified ContainerState message, length delimited. Does not implicitly {@link api.ContainerState.verify|verify} messages.
         * @function encodeDelimited
         * @memberof api.ContainerState
         * @static
         * @param {api.IContainerState} message ContainerState message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ContainerState.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ContainerState message from the specified reader or buffer.
         * @function decode
         * @memberof api.ContainerState
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {api.ContainerState} ContainerState
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ContainerState.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.api.ContainerState();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.state = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a ContainerState message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof api.ContainerState
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {api.ContainerState} ContainerState
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ContainerState.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ContainerState message.
         * @function verify
         * @memberof api.ContainerState
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ContainerState.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.state != null && message.hasOwnProperty("state"))
                switch (message.state) {
                default:
                    return "state: enum value expected";
                case 0:
                case 1:
                    break;
                }
            return null;
        };

        /**
         * Creates a ContainerState message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof api.ContainerState
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {api.ContainerState} ContainerState
         */
        ContainerState.fromObject = function fromObject(object) {
            if (object instanceof $root.api.ContainerState)
                return object;
            var message = new $root.api.ContainerState();
            switch (object.state) {
            case "SLEEP":
            case 0:
                message.state = 0;
                break;
            case "READY":
            case 1:
                message.state = 1;
                break;
            }
            return message;
        };

        /**
         * Creates a plain object from a ContainerState message. Also converts values to other types if specified.
         * @function toObject
         * @memberof api.ContainerState
         * @static
         * @param {api.ContainerState} message ContainerState
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ContainerState.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.state = options.enums === String ? "SLEEP" : 0;
            if (message.state != null && message.hasOwnProperty("state"))
                object.state = options.enums === String ? $root.api.ContainerState.State[message.state] : message.state;
            return object;
        };

        /**
         * Converts this ContainerState to JSON.
         * @function toJSON
         * @memberof api.ContainerState
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ContainerState.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * State enum.
         * @name api.ContainerState.State
         * @enum {string}
         * @property {number} SLEEP=0 SLEEP value
         * @property {number} READY=1 READY value
         */
        ContainerState.State = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "SLEEP"] = 0;
            values[valuesById[1] = "READY"] = 1;
            return values;
        })();

        return ContainerState;
    })();

    api.PortOpen = (function() {

        /**
         * Properties of a PortOpen.
         * @memberof api
         * @interface IPortOpen
         * @property {boolean|null} [forwarded] PortOpen forwarded
         * @property {number|null} [port] PortOpen port
         * @property {string|null} [address] PortOpen address
         */

        /**
         * Constructs a new PortOpen.
         * @memberof api
         * @classdesc Represents a PortOpen.
         * @implements IPortOpen
         * @constructor
         * @param {api.IPortOpen=} [properties] Properties to set
         */
        function PortOpen(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PortOpen forwarded.
         * @member {boolean} forwarded
         * @memberof api.PortOpen
         * @instance
         */
        PortOpen.prototype.forwarded = false;

        /**
         * PortOpen port.
         * @member {number} port
         * @memberof api.PortOpen
         * @instance
         */
        PortOpen.prototype.port = 0;

        /**
         * PortOpen address.
         * @member {string} address
         * @memberof api.PortOpen
         * @instance
         */
        PortOpen.prototype.address = "";

        /**
         * Creates a new PortOpen instance using the specified properties.
         * @function create
         * @memberof api.PortOpen
         * @static
         * @param {api.IPortOpen=} [properties] Properties to set
         * @returns {api.PortOpen} PortOpen instance
         */
        PortOpen.create = function create(properties) {
            return new PortOpen(properties);
        };

        /**
         * Encodes the specified PortOpen message. Does not implicitly {@link api.PortOpen.verify|verify} messages.
         * @function encode
         * @memberof api.PortOpen
         * @static
         * @param {api.IPortOpen} message PortOpen message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PortOpen.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.forwarded != null && message.hasOwnProperty("forwarded"))
                writer.uint32(/* id 1, wireType 0 =*/8).bool(message.forwarded);
            if (message.port != null && message.hasOwnProperty("port"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.port);
            if (message.address != null && message.hasOwnProperty("address"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.address);
            return writer;
        };

        /**
         * Encodes the specified PortOpen message, length delimited. Does not implicitly {@link api.PortOpen.verify|verify} messages.
         * @function encodeDelimited
         * @memberof api.PortOpen
         * @static
         * @param {api.IPortOpen} message PortOpen message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PortOpen.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PortOpen message from the specified reader or buffer.
         * @function decode
         * @memberof api.PortOpen
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {api.PortOpen} PortOpen
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PortOpen.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.api.PortOpen();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.forwarded = reader.bool();
                    break;
                case 2:
                    message.port = reader.uint32();
                    break;
                case 3:
                    message.address = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PortOpen message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof api.PortOpen
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {api.PortOpen} PortOpen
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PortOpen.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PortOpen message.
         * @function verify
         * @memberof api.PortOpen
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PortOpen.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.forwarded != null && message.hasOwnProperty("forwarded"))
                if (typeof message.forwarded !== "boolean")
                    return "forwarded: boolean expected";
            if (message.port != null && message.hasOwnProperty("port"))
                if (!$util.isInteger(message.port))
                    return "port: integer expected";
            if (message.address != null && message.hasOwnProperty("address"))
                if (!$util.isString(message.address))
                    return "address: string expected";
            return null;
        };

        /**
         * Creates a PortOpen message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof api.PortOpen
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {api.PortOpen} PortOpen
         */
        PortOpen.fromObject = function fromObject(object) {
            if (object instanceof $root.api.PortOpen)
                return object;
            var message = new $root.api.PortOpen();
            if (object.forwarded != null)
                message.forwarded = Boolean(object.forwarded);
            if (object.port != null)
                message.port = object.port >>> 0;
            if (object.address != null)
                message.address = String(object.address);
            return message;
        };

        /**
         * Creates a plain object from a PortOpen message. Also converts values to other types if specified.
         * @function toObject
         * @memberof api.PortOpen
         * @static
         * @param {api.PortOpen} message PortOpen
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PortOpen.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.forwarded = false;
                object.port = 0;
                object.address = "";
            }
            if (message.forwarded != null && message.hasOwnProperty("forwarded"))
                object.forwarded = message.forwarded;
            if (message.port != null && message.hasOwnProperty("port"))
                object.port = message.port;
            if (message.address != null && message.hasOwnProperty("address"))
                object.address = message.address;
            return object;
        };

        /**
         * Converts this PortOpen to JSON.
         * @function toJSON
         * @memberof api.PortOpen
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PortOpen.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return PortOpen;
    })();

    api.OTPacket = (function() {

        /**
         * Properties of a OTPacket.
         * @memberof api
         * @interface IOTPacket
         * @property {number|null} [version] OTPacket version
         * @property {Array.<api.IOTRuneTransformOp>|null} [ops] OTPacket ops
         * @property {number|null} [crc32] OTPacket crc32
         */

        /**
         * Constructs a new OTPacket.
         * @memberof api
         * @classdesc Represents a OTPacket.
         * @implements IOTPacket
         * @constructor
         * @param {api.IOTPacket=} [properties] Properties to set
         */
        function OTPacket(properties) {
            this.ops = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * OTPacket version.
         * @member {number} version
         * @memberof api.OTPacket
         * @instance
         */
        OTPacket.prototype.version = 0;

        /**
         * OTPacket ops.
         * @member {Array.<api.IOTRuneTransformOp>} ops
         * @memberof api.OTPacket
         * @instance
         */
        OTPacket.prototype.ops = $util.emptyArray;

        /**
         * OTPacket crc32.
         * @member {number} crc32
         * @memberof api.OTPacket
         * @instance
         */
        OTPacket.prototype.crc32 = 0;

        /**
         * Creates a new OTPacket instance using the specified properties.
         * @function create
         * @memberof api.OTPacket
         * @static
         * @param {api.IOTPacket=} [properties] Properties to set
         * @returns {api.OTPacket} OTPacket instance
         */
        OTPacket.create = function create(properties) {
            return new OTPacket(properties);
        };

        /**
         * Encodes the specified OTPacket message. Does not implicitly {@link api.OTPacket.verify|verify} messages.
         * @function encode
         * @memberof api.OTPacket
         * @static
         * @param {api.IOTPacket} message OTPacket message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        OTPacket.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.version != null && message.hasOwnProperty("version"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.version);
            if (message.ops != null && message.ops.length)
                for (var i = 0; i < message.ops.length; ++i)
                    $root.api.OTRuneTransformOp.encode(message.ops[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.crc32 != null && message.hasOwnProperty("crc32"))
                writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.crc32);
            return writer;
        };

        /**
         * Encodes the specified OTPacket message, length delimited. Does not implicitly {@link api.OTPacket.verify|verify} messages.
         * @function encodeDelimited
         * @memberof api.OTPacket
         * @static
         * @param {api.IOTPacket} message OTPacket message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        OTPacket.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a OTPacket message from the specified reader or buffer.
         * @function decode
         * @memberof api.OTPacket
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {api.OTPacket} OTPacket
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        OTPacket.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.api.OTPacket();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.version = reader.uint32();
                    break;
                case 2:
                    if (!(message.ops && message.ops.length))
                        message.ops = [];
                    message.ops.push($root.api.OTRuneTransformOp.decode(reader, reader.uint32()));
                    break;
                case 3:
                    message.crc32 = reader.uint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a OTPacket message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof api.OTPacket
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {api.OTPacket} OTPacket
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        OTPacket.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a OTPacket message.
         * @function verify
         * @memberof api.OTPacket
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        OTPacket.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.version != null && message.hasOwnProperty("version"))
                if (!$util.isInteger(message.version))
                    return "version: integer expected";
            if (message.ops != null && message.hasOwnProperty("ops")) {
                if (!Array.isArray(message.ops))
                    return "ops: array expected";
                for (var i = 0; i < message.ops.length; ++i) {
                    var error = $root.api.OTRuneTransformOp.verify(message.ops[i]);
                    if (error)
                        return "ops." + error;
                }
            }
            if (message.crc32 != null && message.hasOwnProperty("crc32"))
                if (!$util.isInteger(message.crc32))
                    return "crc32: integer expected";
            return null;
        };

        /**
         * Creates a OTPacket message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof api.OTPacket
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {api.OTPacket} OTPacket
         */
        OTPacket.fromObject = function fromObject(object) {
            if (object instanceof $root.api.OTPacket)
                return object;
            var message = new $root.api.OTPacket();
            if (object.version != null)
                message.version = object.version >>> 0;
            if (object.ops) {
                if (!Array.isArray(object.ops))
                    throw TypeError(".api.OTPacket.ops: array expected");
                message.ops = [];
                for (var i = 0; i < object.ops.length; ++i) {
                    if (typeof object.ops[i] !== "object")
                        throw TypeError(".api.OTPacket.ops: object expected");
                    message.ops[i] = $root.api.OTRuneTransformOp.fromObject(object.ops[i]);
                }
            }
            if (object.crc32 != null)
                message.crc32 = object.crc32 >>> 0;
            return message;
        };

        /**
         * Creates a plain object from a OTPacket message. Also converts values to other types if specified.
         * @function toObject
         * @memberof api.OTPacket
         * @static
         * @param {api.OTPacket} message OTPacket
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        OTPacket.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.ops = [];
            if (options.defaults) {
                object.version = 0;
                object.crc32 = 0;
            }
            if (message.version != null && message.hasOwnProperty("version"))
                object.version = message.version;
            if (message.ops && message.ops.length) {
                object.ops = [];
                for (var j = 0; j < message.ops.length; ++j)
                    object.ops[j] = $root.api.OTRuneTransformOp.toObject(message.ops[j], options);
            }
            if (message.crc32 != null && message.hasOwnProperty("crc32"))
                object.crc32 = message.crc32;
            return object;
        };

        /**
         * Converts this OTPacket to JSON.
         * @function toJSON
         * @memberof api.OTPacket
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        OTPacket.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return OTPacket;
    })();

    api.OTRuneTransformOp = (function() {

        /**
         * Properties of a OTRuneTransformOp.
         * @memberof api
         * @interface IOTRuneTransformOp
         * @property {number|null} [skip] OTRuneTransformOp skip
         * @property {number|null} ["delete"] OTRuneTransformOp delete
         * @property {string|null} [insert] OTRuneTransformOp insert
         */

        /**
         * Constructs a new OTRuneTransformOp.
         * @memberof api
         * @classdesc Represents a OTRuneTransformOp.
         * @implements IOTRuneTransformOp
         * @constructor
         * @param {api.IOTRuneTransformOp=} [properties] Properties to set
         */
        function OTRuneTransformOp(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * OTRuneTransformOp skip.
         * @member {number} skip
         * @memberof api.OTRuneTransformOp
         * @instance
         */
        OTRuneTransformOp.prototype.skip = 0;

        /**
         * OTRuneTransformOp delete.
         * @member {number} delete
         * @memberof api.OTRuneTransformOp
         * @instance
         */
        OTRuneTransformOp.prototype["delete"] = 0;

        /**
         * OTRuneTransformOp insert.
         * @member {string} insert
         * @memberof api.OTRuneTransformOp
         * @instance
         */
        OTRuneTransformOp.prototype.insert = "";

        // OneOf field names bound to virtual getters and setters
        var $oneOfFields;

        /**
         * OTRuneTransformOp op.
         * @member {"skip"|"delete"|"insert"|undefined} op
         * @memberof api.OTRuneTransformOp
         * @instance
         */
        Object.defineProperty(OTRuneTransformOp.prototype, "op", {
            get: $util.oneOfGetter($oneOfFields = ["skip", "delete", "insert"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new OTRuneTransformOp instance using the specified properties.
         * @function create
         * @memberof api.OTRuneTransformOp
         * @static
         * @param {api.IOTRuneTransformOp=} [properties] Properties to set
         * @returns {api.OTRuneTransformOp} OTRuneTransformOp instance
         */
        OTRuneTransformOp.create = function create(properties) {
            return new OTRuneTransformOp(properties);
        };

        /**
         * Encodes the specified OTRuneTransformOp message. Does not implicitly {@link api.OTRuneTransformOp.verify|verify} messages.
         * @function encode
         * @memberof api.OTRuneTransformOp
         * @static
         * @param {api.IOTRuneTransformOp} message OTRuneTransformOp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        OTRuneTransformOp.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.skip != null && message.hasOwnProperty("skip"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.skip);
            if (message["delete"] != null && message.hasOwnProperty("delete"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint32(message["delete"]);
            if (message.insert != null && message.hasOwnProperty("insert"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.insert);
            return writer;
        };

        /**
         * Encodes the specified OTRuneTransformOp message, length delimited. Does not implicitly {@link api.OTRuneTransformOp.verify|verify} messages.
         * @function encodeDelimited
         * @memberof api.OTRuneTransformOp
         * @static
         * @param {api.IOTRuneTransformOp} message OTRuneTransformOp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        OTRuneTransformOp.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a OTRuneTransformOp message from the specified reader or buffer.
         * @function decode
         * @memberof api.OTRuneTransformOp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {api.OTRuneTransformOp} OTRuneTransformOp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        OTRuneTransformOp.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.api.OTRuneTransformOp();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.skip = reader.uint32();
                    break;
                case 2:
                    message["delete"] = reader.uint32();
                    break;
                case 3:
                    message.insert = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a OTRuneTransformOp message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof api.OTRuneTransformOp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {api.OTRuneTransformOp} OTRuneTransformOp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        OTRuneTransformOp.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a OTRuneTransformOp message.
         * @function verify
         * @memberof api.OTRuneTransformOp
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        OTRuneTransformOp.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            var properties = {};
            if (message.skip != null && message.hasOwnProperty("skip")) {
                properties.op = 1;
                if (!$util.isInteger(message.skip))
                    return "skip: integer expected";
            }
            if (message["delete"] != null && message.hasOwnProperty("delete")) {
                if (properties.op === 1)
                    return "op: multiple values";
                properties.op = 1;
                if (!$util.isInteger(message["delete"]))
                    return "delete: integer expected";
            }
            if (message.insert != null && message.hasOwnProperty("insert")) {
                if (properties.op === 1)
                    return "op: multiple values";
                properties.op = 1;
                if (!$util.isString(message.insert))
                    return "insert: string expected";
            }
            return null;
        };

        /**
         * Creates a OTRuneTransformOp message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof api.OTRuneTransformOp
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {api.OTRuneTransformOp} OTRuneTransformOp
         */
        OTRuneTransformOp.fromObject = function fromObject(object) {
            if (object instanceof $root.api.OTRuneTransformOp)
                return object;
            var message = new $root.api.OTRuneTransformOp();
            if (object.skip != null)
                message.skip = object.skip >>> 0;
            if (object["delete"] != null)
                message["delete"] = object["delete"] >>> 0;
            if (object.insert != null)
                message.insert = String(object.insert);
            return message;
        };

        /**
         * Creates a plain object from a OTRuneTransformOp message. Also converts values to other types if specified.
         * @function toObject
         * @memberof api.OTRuneTransformOp
         * @static
         * @param {api.OTRuneTransformOp} message OTRuneTransformOp
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        OTRuneTransformOp.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (message.skip != null && message.hasOwnProperty("skip")) {
                object.skip = message.skip;
                if (options.oneofs)
                    object.op = "skip";
            }
            if (message["delete"] != null && message.hasOwnProperty("delete")) {
                object["delete"] = message["delete"];
                if (options.oneofs)
                    object.op = "delete";
            }
            if (message.insert != null && message.hasOwnProperty("insert")) {
                object.insert = message.insert;
                if (options.oneofs)
                    object.op = "insert";
            }
            return object;
        };

        /**
         * Converts this OTRuneTransformOp to JSON.
         * @function toJSON
         * @memberof api.OTRuneTransformOp
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        OTRuneTransformOp.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return OTRuneTransformOp;
    })();

    api.OTStatus = (function() {

        /**
         * Properties of a OTStatus.
         * @memberof api
         * @interface IOTStatus
         * @property {string|null} [contents] OTStatus contents
         * @property {number|null} [version] OTStatus version
         * @property {api.IFile|null} [linkedFile] OTStatus linkedFile
         * @property {Array.<api.IOTCursor>|null} [cursors] OTStatus cursors
         */

        /**
         * Constructs a new OTStatus.
         * @memberof api
         * @classdesc Represents a OTStatus.
         * @implements IOTStatus
         * @constructor
         * @param {api.IOTStatus=} [properties] Properties to set
         */
        function OTStatus(properties) {
            this.cursors = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * OTStatus contents.
         * @member {string} contents
         * @memberof api.OTStatus
         * @instance
         */
        OTStatus.prototype.contents = "";

        /**
         * OTStatus version.
         * @member {number} version
         * @memberof api.OTStatus
         * @instance
         */
        OTStatus.prototype.version = 0;

        /**
         * OTStatus linkedFile.
         * @member {api.IFile|null|undefined} linkedFile
         * @memberof api.OTStatus
         * @instance
         */
        OTStatus.prototype.linkedFile = null;

        /**
         * OTStatus cursors.
         * @member {Array.<api.IOTCursor>} cursors
         * @memberof api.OTStatus
         * @instance
         */
        OTStatus.prototype.cursors = $util.emptyArray;

        /**
         * Creates a new OTStatus instance using the specified properties.
         * @function create
         * @memberof api.OTStatus
         * @static
         * @param {api.IOTStatus=} [properties] Properties to set
         * @returns {api.OTStatus} OTStatus instance
         */
        OTStatus.create = function create(properties) {
            return new OTStatus(properties);
        };

        /**
         * Encodes the specified OTStatus message. Does not implicitly {@link api.OTStatus.verify|verify} messages.
         * @function encode
         * @memberof api.OTStatus
         * @static
         * @param {api.IOTStatus} message OTStatus message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        OTStatus.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.contents != null && message.hasOwnProperty("contents"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.contents);
            if (message.version != null && message.hasOwnProperty("version"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.version);
            if (message.linkedFile != null && message.hasOwnProperty("linkedFile"))
                $root.api.File.encode(message.linkedFile, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.cursors != null && message.cursors.length)
                for (var i = 0; i < message.cursors.length; ++i)
                    $root.api.OTCursor.encode(message.cursors[i], writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified OTStatus message, length delimited. Does not implicitly {@link api.OTStatus.verify|verify} messages.
         * @function encodeDelimited
         * @memberof api.OTStatus
         * @static
         * @param {api.IOTStatus} message OTStatus message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        OTStatus.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a OTStatus message from the specified reader or buffer.
         * @function decode
         * @memberof api.OTStatus
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {api.OTStatus} OTStatus
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        OTStatus.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.api.OTStatus();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.contents = reader.string();
                    break;
                case 2:
                    message.version = reader.uint32();
                    break;
                case 3:
                    message.linkedFile = $root.api.File.decode(reader, reader.uint32());
                    break;
                case 4:
                    if (!(message.cursors && message.cursors.length))
                        message.cursors = [];
                    message.cursors.push($root.api.OTCursor.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a OTStatus message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof api.OTStatus
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {api.OTStatus} OTStatus
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        OTStatus.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a OTStatus message.
         * @function verify
         * @memberof api.OTStatus
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        OTStatus.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.contents != null && message.hasOwnProperty("contents"))
                if (!$util.isString(message.contents))
                    return "contents: string expected";
            if (message.version != null && message.hasOwnProperty("version"))
                if (!$util.isInteger(message.version))
                    return "version: integer expected";
            if (message.linkedFile != null && message.hasOwnProperty("linkedFile")) {
                var error = $root.api.File.verify(message.linkedFile);
                if (error)
                    return "linkedFile." + error;
            }
            if (message.cursors != null && message.hasOwnProperty("cursors")) {
                if (!Array.isArray(message.cursors))
                    return "cursors: array expected";
                for (var i = 0; i < message.cursors.length; ++i) {
                    var error = $root.api.OTCursor.verify(message.cursors[i]);
                    if (error)
                        return "cursors." + error;
                }
            }
            return null;
        };

        /**
         * Creates a OTStatus message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof api.OTStatus
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {api.OTStatus} OTStatus
         */
        OTStatus.fromObject = function fromObject(object) {
            if (object instanceof $root.api.OTStatus)
                return object;
            var message = new $root.api.OTStatus();
            if (object.contents != null)
                message.contents = String(object.contents);
            if (object.version != null)
                message.version = object.version >>> 0;
            if (object.linkedFile != null) {
                if (typeof object.linkedFile !== "object")
                    throw TypeError(".api.OTStatus.linkedFile: object expected");
                message.linkedFile = $root.api.File.fromObject(object.linkedFile);
            }
            if (object.cursors) {
                if (!Array.isArray(object.cursors))
                    throw TypeError(".api.OTStatus.cursors: array expected");
                message.cursors = [];
                for (var i = 0; i < object.cursors.length; ++i) {
                    if (typeof object.cursors[i] !== "object")
                        throw TypeError(".api.OTStatus.cursors: object expected");
                    message.cursors[i] = $root.api.OTCursor.fromObject(object.cursors[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a OTStatus message. Also converts values to other types if specified.
         * @function toObject
         * @memberof api.OTStatus
         * @static
         * @param {api.OTStatus} message OTStatus
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        OTStatus.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.cursors = [];
            if (options.defaults) {
                object.contents = "";
                object.version = 0;
                object.linkedFile = null;
            }
            if (message.contents != null && message.hasOwnProperty("contents"))
                object.contents = message.contents;
            if (message.version != null && message.hasOwnProperty("version"))
                object.version = message.version;
            if (message.linkedFile != null && message.hasOwnProperty("linkedFile"))
                object.linkedFile = $root.api.File.toObject(message.linkedFile, options);
            if (message.cursors && message.cursors.length) {
                object.cursors = [];
                for (var j = 0; j < message.cursors.length; ++j)
                    object.cursors[j] = $root.api.OTCursor.toObject(message.cursors[j], options);
            }
            return object;
        };

        /**
         * Converts this OTStatus to JSON.
         * @function toJSON
         * @memberof api.OTStatus
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        OTStatus.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return OTStatus;
    })();

    api.OTCursor = (function() {

        /**
         * Properties of a OTCursor.
         * @memberof api
         * @interface IOTCursor
         * @property {number|null} [position] OTCursor position
         * @property {number|null} [selectionStart] OTCursor selectionStart
         * @property {number|null} [selectionEnd] OTCursor selectionEnd
         * @property {api.IUser|null} [user] OTCursor user
         * @property {string|null} [id] OTCursor id
         */

        /**
         * Constructs a new OTCursor.
         * @memberof api
         * @classdesc Represents a OTCursor.
         * @implements IOTCursor
         * @constructor
         * @param {api.IOTCursor=} [properties] Properties to set
         */
        function OTCursor(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * OTCursor position.
         * @member {number} position
         * @memberof api.OTCursor
         * @instance
         */
        OTCursor.prototype.position = 0;

        /**
         * OTCursor selectionStart.
         * @member {number} selectionStart
         * @memberof api.OTCursor
         * @instance
         */
        OTCursor.prototype.selectionStart = 0;

        /**
         * OTCursor selectionEnd.
         * @member {number} selectionEnd
         * @memberof api.OTCursor
         * @instance
         */
        OTCursor.prototype.selectionEnd = 0;

        /**
         * OTCursor user.
         * @member {api.IUser|null|undefined} user
         * @memberof api.OTCursor
         * @instance
         */
        OTCursor.prototype.user = null;

        /**
         * OTCursor id.
         * @member {string} id
         * @memberof api.OTCursor
         * @instance
         */
        OTCursor.prototype.id = "";

        /**
         * Creates a new OTCursor instance using the specified properties.
         * @function create
         * @memberof api.OTCursor
         * @static
         * @param {api.IOTCursor=} [properties] Properties to set
         * @returns {api.OTCursor} OTCursor instance
         */
        OTCursor.create = function create(properties) {
            return new OTCursor(properties);
        };

        /**
         * Encodes the specified OTCursor message. Does not implicitly {@link api.OTCursor.verify|verify} messages.
         * @function encode
         * @memberof api.OTCursor
         * @static
         * @param {api.IOTCursor} message OTCursor message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        OTCursor.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.position != null && message.hasOwnProperty("position"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.position);
            if (message.selectionStart != null && message.hasOwnProperty("selectionStart"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.selectionStart);
            if (message.selectionEnd != null && message.hasOwnProperty("selectionEnd"))
                writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.selectionEnd);
            if (message.user != null && message.hasOwnProperty("user"))
                $root.api.User.encode(message.user, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            if (message.id != null && message.hasOwnProperty("id"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.id);
            return writer;
        };

        /**
         * Encodes the specified OTCursor message, length delimited. Does not implicitly {@link api.OTCursor.verify|verify} messages.
         * @function encodeDelimited
         * @memberof api.OTCursor
         * @static
         * @param {api.IOTCursor} message OTCursor message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        OTCursor.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a OTCursor message from the specified reader or buffer.
         * @function decode
         * @memberof api.OTCursor
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {api.OTCursor} OTCursor
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        OTCursor.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.api.OTCursor();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.position = reader.uint32();
                    break;
                case 2:
                    message.selectionStart = reader.uint32();
                    break;
                case 3:
                    message.selectionEnd = reader.uint32();
                    break;
                case 4:
                    message.user = $root.api.User.decode(reader, reader.uint32());
                    break;
                case 5:
                    message.id = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a OTCursor message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof api.OTCursor
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {api.OTCursor} OTCursor
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        OTCursor.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a OTCursor message.
         * @function verify
         * @memberof api.OTCursor
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        OTCursor.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.position != null && message.hasOwnProperty("position"))
                if (!$util.isInteger(message.position))
                    return "position: integer expected";
            if (message.selectionStart != null && message.hasOwnProperty("selectionStart"))
                if (!$util.isInteger(message.selectionStart))
                    return "selectionStart: integer expected";
            if (message.selectionEnd != null && message.hasOwnProperty("selectionEnd"))
                if (!$util.isInteger(message.selectionEnd))
                    return "selectionEnd: integer expected";
            if (message.user != null && message.hasOwnProperty("user")) {
                var error = $root.api.User.verify(message.user);
                if (error)
                    return "user." + error;
            }
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isString(message.id))
                    return "id: string expected";
            return null;
        };

        /**
         * Creates a OTCursor message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof api.OTCursor
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {api.OTCursor} OTCursor
         */
        OTCursor.fromObject = function fromObject(object) {
            if (object instanceof $root.api.OTCursor)
                return object;
            var message = new $root.api.OTCursor();
            if (object.position != null)
                message.position = object.position >>> 0;
            if (object.selectionStart != null)
                message.selectionStart = object.selectionStart >>> 0;
            if (object.selectionEnd != null)
                message.selectionEnd = object.selectionEnd >>> 0;
            if (object.user != null) {
                if (typeof object.user !== "object")
                    throw TypeError(".api.OTCursor.user: object expected");
                message.user = $root.api.User.fromObject(object.user);
            }
            if (object.id != null)
                message.id = String(object.id);
            return message;
        };

        /**
         * Creates a plain object from a OTCursor message. Also converts values to other types if specified.
         * @function toObject
         * @memberof api.OTCursor
         * @static
         * @param {api.OTCursor} message OTCursor
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        OTCursor.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.position = 0;
                object.selectionStart = 0;
                object.selectionEnd = 0;
                object.user = null;
                object.id = "";
            }
            if (message.position != null && message.hasOwnProperty("position"))
                object.position = message.position;
            if (message.selectionStart != null && message.hasOwnProperty("selectionStart"))
                object.selectionStart = message.selectionStart;
            if (message.selectionEnd != null && message.hasOwnProperty("selectionEnd"))
                object.selectionEnd = message.selectionEnd;
            if (message.user != null && message.hasOwnProperty("user"))
                object.user = $root.api.User.toObject(message.user, options);
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            return object;
        };

        /**
         * Converts this OTCursor to JSON.
         * @function toJSON
         * @memberof api.OTCursor
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        OTCursor.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return OTCursor;
    })();

    api.ChatMessage = (function() {

        /**
         * Properties of a ChatMessage.
         * @memberof api
         * @interface IChatMessage
         * @property {string|null} [username] ChatMessage username
         * @property {string|null} [text] ChatMessage text
         */

        /**
         * Constructs a new ChatMessage.
         * @memberof api
         * @classdesc Represents a ChatMessage.
         * @implements IChatMessage
         * @constructor
         * @param {api.IChatMessage=} [properties] Properties to set
         */
        function ChatMessage(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ChatMessage username.
         * @member {string} username
         * @memberof api.ChatMessage
         * @instance
         */
        ChatMessage.prototype.username = "";

        /**
         * ChatMessage text.
         * @member {string} text
         * @memberof api.ChatMessage
         * @instance
         */
        ChatMessage.prototype.text = "";

        /**
         * Creates a new ChatMessage instance using the specified properties.
         * @function create
         * @memberof api.ChatMessage
         * @static
         * @param {api.IChatMessage=} [properties] Properties to set
         * @returns {api.ChatMessage} ChatMessage instance
         */
        ChatMessage.create = function create(properties) {
            return new ChatMessage(properties);
        };

        /**
         * Encodes the specified ChatMessage message. Does not implicitly {@link api.ChatMessage.verify|verify} messages.
         * @function encode
         * @memberof api.ChatMessage
         * @static
         * @param {api.IChatMessage} message ChatMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ChatMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.username != null && message.hasOwnProperty("username"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.username);
            if (message.text != null && message.hasOwnProperty("text"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.text);
            return writer;
        };

        /**
         * Encodes the specified ChatMessage message, length delimited. Does not implicitly {@link api.ChatMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof api.ChatMessage
         * @static
         * @param {api.IChatMessage} message ChatMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ChatMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ChatMessage message from the specified reader or buffer.
         * @function decode
         * @memberof api.ChatMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {api.ChatMessage} ChatMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ChatMessage.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.api.ChatMessage();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.username = reader.string();
                    break;
                case 2:
                    message.text = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a ChatMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof api.ChatMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {api.ChatMessage} ChatMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ChatMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ChatMessage message.
         * @function verify
         * @memberof api.ChatMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ChatMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.username != null && message.hasOwnProperty("username"))
                if (!$util.isString(message.username))
                    return "username: string expected";
            if (message.text != null && message.hasOwnProperty("text"))
                if (!$util.isString(message.text))
                    return "text: string expected";
            return null;
        };

        /**
         * Creates a ChatMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof api.ChatMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {api.ChatMessage} ChatMessage
         */
        ChatMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.api.ChatMessage)
                return object;
            var message = new $root.api.ChatMessage();
            if (object.username != null)
                message.username = String(object.username);
            if (object.text != null)
                message.text = String(object.text);
            return message;
        };

        /**
         * Creates a plain object from a ChatMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof api.ChatMessage
         * @static
         * @param {api.ChatMessage} message ChatMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ChatMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.username = "";
                object.text = "";
            }
            if (message.username != null && message.hasOwnProperty("username"))
                object.username = message.username;
            if (message.text != null && message.hasOwnProperty("text"))
                object.text = message.text;
            return object;
        };

        /**
         * Converts this ChatMessage to JSON.
         * @function toJSON
         * @memberof api.ChatMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ChatMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return ChatMessage;
    })();

    api.ChatTyping = (function() {

        /**
         * Properties of a ChatTyping.
         * @memberof api
         * @interface IChatTyping
         * @property {string|null} [username] ChatTyping username
         * @property {boolean|null} [typing] ChatTyping typing
         */

        /**
         * Constructs a new ChatTyping.
         * @memberof api
         * @classdesc Represents a ChatTyping.
         * @implements IChatTyping
         * @constructor
         * @param {api.IChatTyping=} [properties] Properties to set
         */
        function ChatTyping(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ChatTyping username.
         * @member {string} username
         * @memberof api.ChatTyping
         * @instance
         */
        ChatTyping.prototype.username = "";

        /**
         * ChatTyping typing.
         * @member {boolean} typing
         * @memberof api.ChatTyping
         * @instance
         */
        ChatTyping.prototype.typing = false;

        /**
         * Creates a new ChatTyping instance using the specified properties.
         * @function create
         * @memberof api.ChatTyping
         * @static
         * @param {api.IChatTyping=} [properties] Properties to set
         * @returns {api.ChatTyping} ChatTyping instance
         */
        ChatTyping.create = function create(properties) {
            return new ChatTyping(properties);
        };

        /**
         * Encodes the specified ChatTyping message. Does not implicitly {@link api.ChatTyping.verify|verify} messages.
         * @function encode
         * @memberof api.ChatTyping
         * @static
         * @param {api.IChatTyping} message ChatTyping message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ChatTyping.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.username != null && message.hasOwnProperty("username"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.username);
            if (message.typing != null && message.hasOwnProperty("typing"))
                writer.uint32(/* id 2, wireType 0 =*/16).bool(message.typing);
            return writer;
        };

        /**
         * Encodes the specified ChatTyping message, length delimited. Does not implicitly {@link api.ChatTyping.verify|verify} messages.
         * @function encodeDelimited
         * @memberof api.ChatTyping
         * @static
         * @param {api.IChatTyping} message ChatTyping message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ChatTyping.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ChatTyping message from the specified reader or buffer.
         * @function decode
         * @memberof api.ChatTyping
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {api.ChatTyping} ChatTyping
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ChatTyping.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.api.ChatTyping();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.username = reader.string();
                    break;
                case 2:
                    message.typing = reader.bool();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a ChatTyping message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof api.ChatTyping
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {api.ChatTyping} ChatTyping
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ChatTyping.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ChatTyping message.
         * @function verify
         * @memberof api.ChatTyping
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ChatTyping.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.username != null && message.hasOwnProperty("username"))
                if (!$util.isString(message.username))
                    return "username: string expected";
            if (message.typing != null && message.hasOwnProperty("typing"))
                if (typeof message.typing !== "boolean")
                    return "typing: boolean expected";
            return null;
        };

        /**
         * Creates a ChatTyping message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof api.ChatTyping
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {api.ChatTyping} ChatTyping
         */
        ChatTyping.fromObject = function fromObject(object) {
            if (object instanceof $root.api.ChatTyping)
                return object;
            var message = new $root.api.ChatTyping();
            if (object.username != null)
                message.username = String(object.username);
            if (object.typing != null)
                message.typing = Boolean(object.typing);
            return message;
        };

        /**
         * Creates a plain object from a ChatTyping message. Also converts values to other types if specified.
         * @function toObject
         * @memberof api.ChatTyping
         * @static
         * @param {api.ChatTyping} message ChatTyping
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ChatTyping.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.username = "";
                object.typing = false;
            }
            if (message.username != null && message.hasOwnProperty("username"))
                object.username = message.username;
            if (message.typing != null && message.hasOwnProperty("typing"))
                object.typing = message.typing;
            return object;
        };

        /**
         * Converts this ChatTyping to JSON.
         * @function toJSON
         * @memberof api.ChatTyping
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ChatTyping.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return ChatTyping;
    })();

    api.User = (function() {

        /**
         * Properties of a User.
         * @memberof api
         * @interface IUser
         * @property {number|null} [id] User id
         * @property {string|null} [name] User name
         * @property {Array.<string>|null} [roles] User roles
         * @property {number|null} [session] User session
         */

        /**
         * Constructs a new User.
         * @memberof api
         * @classdesc Represents a User.
         * @implements IUser
         * @constructor
         * @param {api.IUser=} [properties] Properties to set
         */
        function User(properties) {
            this.roles = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * User id.
         * @member {number} id
         * @memberof api.User
         * @instance
         */
        User.prototype.id = 0;

        /**
         * User name.
         * @member {string} name
         * @memberof api.User
         * @instance
         */
        User.prototype.name = "";

        /**
         * User roles.
         * @member {Array.<string>} roles
         * @memberof api.User
         * @instance
         */
        User.prototype.roles = $util.emptyArray;

        /**
         * User session.
         * @member {number} session
         * @memberof api.User
         * @instance
         */
        User.prototype.session = 0;

        /**
         * Creates a new User instance using the specified properties.
         * @function create
         * @memberof api.User
         * @static
         * @param {api.IUser=} [properties] Properties to set
         * @returns {api.User} User instance
         */
        User.create = function create(properties) {
            return new User(properties);
        };

        /**
         * Encodes the specified User message. Does not implicitly {@link api.User.verify|verify} messages.
         * @function encode
         * @memberof api.User
         * @static
         * @param {api.IUser} message User message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        User.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && message.hasOwnProperty("id"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.id);
            if (message.name != null && message.hasOwnProperty("name"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
            if (message.roles != null && message.roles.length)
                for (var i = 0; i < message.roles.length; ++i)
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.roles[i]);
            if (message.session != null && message.hasOwnProperty("session"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.session);
            return writer;
        };

        /**
         * Encodes the specified User message, length delimited. Does not implicitly {@link api.User.verify|verify} messages.
         * @function encodeDelimited
         * @memberof api.User
         * @static
         * @param {api.IUser} message User message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        User.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a User message from the specified reader or buffer.
         * @function decode
         * @memberof api.User
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {api.User} User
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        User.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.api.User();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.id = reader.uint32();
                    break;
                case 2:
                    message.name = reader.string();
                    break;
                case 3:
                    if (!(message.roles && message.roles.length))
                        message.roles = [];
                    message.roles.push(reader.string());
                    break;
                case 4:
                    message.session = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a User message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof api.User
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {api.User} User
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        User.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a User message.
         * @function verify
         * @memberof api.User
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        User.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isInteger(message.id))
                    return "id: integer expected";
            if (message.name != null && message.hasOwnProperty("name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            if (message.roles != null && message.hasOwnProperty("roles")) {
                if (!Array.isArray(message.roles))
                    return "roles: array expected";
                for (var i = 0; i < message.roles.length; ++i)
                    if (!$util.isString(message.roles[i]))
                        return "roles: string[] expected";
            }
            if (message.session != null && message.hasOwnProperty("session"))
                if (!$util.isInteger(message.session))
                    return "session: integer expected";
            return null;
        };

        /**
         * Creates a User message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof api.User
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {api.User} User
         */
        User.fromObject = function fromObject(object) {
            if (object instanceof $root.api.User)
                return object;
            var message = new $root.api.User();
            if (object.id != null)
                message.id = object.id >>> 0;
            if (object.name != null)
                message.name = String(object.name);
            if (object.roles) {
                if (!Array.isArray(object.roles))
                    throw TypeError(".api.User.roles: array expected");
                message.roles = [];
                for (var i = 0; i < object.roles.length; ++i)
                    message.roles[i] = String(object.roles[i]);
            }
            if (object.session != null)
                message.session = object.session | 0;
            return message;
        };

        /**
         * Creates a plain object from a User message. Also converts values to other types if specified.
         * @function toObject
         * @memberof api.User
         * @static
         * @param {api.User} message User
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        User.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.roles = [];
            if (options.defaults) {
                object.id = 0;
                object.name = "";
                object.session = 0;
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.name != null && message.hasOwnProperty("name"))
                object.name = message.name;
            if (message.roles && message.roles.length) {
                object.roles = [];
                for (var j = 0; j < message.roles.length; ++j)
                    object.roles[j] = message.roles[j];
            }
            if (message.session != null && message.hasOwnProperty("session"))
                object.session = message.session;
            return object;
        };

        /**
         * Converts this User to JSON.
         * @function toJSON
         * @memberof api.User
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        User.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return User;
    })();

    api.Roster = (function() {

        /**
         * Properties of a Roster.
         * @memberof api
         * @interface IRoster
         * @property {Array.<api.IUser>|null} [user] Roster user
         */

        /**
         * Constructs a new Roster.
         * @memberof api
         * @classdesc Represents a Roster.
         * @implements IRoster
         * @constructor
         * @param {api.IRoster=} [properties] Properties to set
         */
        function Roster(properties) {
            this.user = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Roster user.
         * @member {Array.<api.IUser>} user
         * @memberof api.Roster
         * @instance
         */
        Roster.prototype.user = $util.emptyArray;

        /**
         * Creates a new Roster instance using the specified properties.
         * @function create
         * @memberof api.Roster
         * @static
         * @param {api.IRoster=} [properties] Properties to set
         * @returns {api.Roster} Roster instance
         */
        Roster.create = function create(properties) {
            return new Roster(properties);
        };

        /**
         * Encodes the specified Roster message. Does not implicitly {@link api.Roster.verify|verify} messages.
         * @function encode
         * @memberof api.Roster
         * @static
         * @param {api.IRoster} message Roster message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Roster.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.user != null && message.user.length)
                for (var i = 0; i < message.user.length; ++i)
                    $root.api.User.encode(message.user[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified Roster message, length delimited. Does not implicitly {@link api.Roster.verify|verify} messages.
         * @function encodeDelimited
         * @memberof api.Roster
         * @static
         * @param {api.IRoster} message Roster message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Roster.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Roster message from the specified reader or buffer.
         * @function decode
         * @memberof api.Roster
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {api.Roster} Roster
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Roster.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.api.Roster();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.user && message.user.length))
                        message.user = [];
                    message.user.push($root.api.User.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Roster message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof api.Roster
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {api.Roster} Roster
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Roster.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Roster message.
         * @function verify
         * @memberof api.Roster
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Roster.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.user != null && message.hasOwnProperty("user")) {
                if (!Array.isArray(message.user))
                    return "user: array expected";
                for (var i = 0; i < message.user.length; ++i) {
                    var error = $root.api.User.verify(message.user[i]);
                    if (error)
                        return "user." + error;
                }
            }
            return null;
        };

        /**
         * Creates a Roster message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof api.Roster
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {api.Roster} Roster
         */
        Roster.fromObject = function fromObject(object) {
            if (object instanceof $root.api.Roster)
                return object;
            var message = new $root.api.Roster();
            if (object.user) {
                if (!Array.isArray(object.user))
                    throw TypeError(".api.Roster.user: array expected");
                message.user = [];
                for (var i = 0; i < object.user.length; ++i) {
                    if (typeof object.user[i] !== "object")
                        throw TypeError(".api.Roster.user: object expected");
                    message.user[i] = $root.api.User.fromObject(object.user[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a Roster message. Also converts values to other types if specified.
         * @function toObject
         * @memberof api.Roster
         * @static
         * @param {api.Roster} message Roster
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Roster.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.user = [];
            if (message.user && message.user.length) {
                object.user = [];
                for (var j = 0; j < message.user.length; ++j)
                    object.user[j] = $root.api.User.toObject(message.user[j], options);
            }
            return object;
        };

        /**
         * Converts this Roster to JSON.
         * @function toJSON
         * @memberof api.Roster
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Roster.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Roster;
    })();

    api.Exec = (function() {

        /**
         * Properties of an Exec.
         * @memberof api
         * @interface IExec
         * @property {Array.<string>|null} [args] Exec args
         * @property {Object.<string,string>|null} [env] Exec env
         */

        /**
         * Constructs a new Exec.
         * @memberof api
         * @classdesc Represents an Exec.
         * @implements IExec
         * @constructor
         * @param {api.IExec=} [properties] Properties to set
         */
        function Exec(properties) {
            this.args = [];
            this.env = {};
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Exec args.
         * @member {Array.<string>} args
         * @memberof api.Exec
         * @instance
         */
        Exec.prototype.args = $util.emptyArray;

        /**
         * Exec env.
         * @member {Object.<string,string>} env
         * @memberof api.Exec
         * @instance
         */
        Exec.prototype.env = $util.emptyObject;

        /**
         * Creates a new Exec instance using the specified properties.
         * @function create
         * @memberof api.Exec
         * @static
         * @param {api.IExec=} [properties] Properties to set
         * @returns {api.Exec} Exec instance
         */
        Exec.create = function create(properties) {
            return new Exec(properties);
        };

        /**
         * Encodes the specified Exec message. Does not implicitly {@link api.Exec.verify|verify} messages.
         * @function encode
         * @memberof api.Exec
         * @static
         * @param {api.IExec} message Exec message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Exec.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.args != null && message.args.length)
                for (var i = 0; i < message.args.length; ++i)
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.args[i]);
            if (message.env != null && message.hasOwnProperty("env"))
                for (var keys = Object.keys(message.env), i = 0; i < keys.length; ++i)
                    writer.uint32(/* id 2, wireType 2 =*/18).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]).uint32(/* id 2, wireType 2 =*/18).string(message.env[keys[i]]).ldelim();
            return writer;
        };

        /**
         * Encodes the specified Exec message, length delimited. Does not implicitly {@link api.Exec.verify|verify} messages.
         * @function encodeDelimited
         * @memberof api.Exec
         * @static
         * @param {api.IExec} message Exec message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Exec.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an Exec message from the specified reader or buffer.
         * @function decode
         * @memberof api.Exec
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {api.Exec} Exec
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Exec.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.api.Exec(), key;
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.args && message.args.length))
                        message.args = [];
                    message.args.push(reader.string());
                    break;
                case 2:
                    reader.skip().pos++;
                    if (message.env === $util.emptyObject)
                        message.env = {};
                    key = reader.string();
                    reader.pos++;
                    message.env[key] = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an Exec message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof api.Exec
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {api.Exec} Exec
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Exec.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an Exec message.
         * @function verify
         * @memberof api.Exec
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Exec.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.args != null && message.hasOwnProperty("args")) {
                if (!Array.isArray(message.args))
                    return "args: array expected";
                for (var i = 0; i < message.args.length; ++i)
                    if (!$util.isString(message.args[i]))
                        return "args: string[] expected";
            }
            if (message.env != null && message.hasOwnProperty("env")) {
                if (!$util.isObject(message.env))
                    return "env: object expected";
                var key = Object.keys(message.env);
                for (var i = 0; i < key.length; ++i)
                    if (!$util.isString(message.env[key[i]]))
                        return "env: string{k:string} expected";
            }
            return null;
        };

        /**
         * Creates an Exec message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof api.Exec
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {api.Exec} Exec
         */
        Exec.fromObject = function fromObject(object) {
            if (object instanceof $root.api.Exec)
                return object;
            var message = new $root.api.Exec();
            if (object.args) {
                if (!Array.isArray(object.args))
                    throw TypeError(".api.Exec.args: array expected");
                message.args = [];
                for (var i = 0; i < object.args.length; ++i)
                    message.args[i] = String(object.args[i]);
            }
            if (object.env) {
                if (typeof object.env !== "object")
                    throw TypeError(".api.Exec.env: object expected");
                message.env = {};
                for (var keys = Object.keys(object.env), i = 0; i < keys.length; ++i)
                    message.env[keys[i]] = String(object.env[keys[i]]);
            }
            return message;
        };

        /**
         * Creates a plain object from an Exec message. Also converts values to other types if specified.
         * @function toObject
         * @memberof api.Exec
         * @static
         * @param {api.Exec} message Exec
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Exec.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.args = [];
            if (options.objects || options.defaults)
                object.env = {};
            if (message.args && message.args.length) {
                object.args = [];
                for (var j = 0; j < message.args.length; ++j)
                    object.args[j] = message.args[j];
            }
            var keys2;
            if (message.env && (keys2 = Object.keys(message.env)).length) {
                object.env = {};
                for (var j = 0; j < keys2.length; ++j)
                    object.env[keys2[j]] = message.env[keys2[j]];
            }
            return object;
        };

        /**
         * Converts this Exec to JSON.
         * @function toJSON
         * @memberof api.Exec
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Exec.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Exec;
    })();

    api.Package = (function() {

        /**
         * Properties of a Package.
         * @memberof api
         * @interface IPackage
         * @property {string|null} [name] Package name
         * @property {string|null} [spec] Package spec
         * @property {string|null} [description] Package description
         * @property {string|null} [version] Package version
         * @property {string|null} [homepageURL] Package homepageURL
         * @property {string|null} [documentationURL] Package documentationURL
         * @property {string|null} [sourceCodeURL] Package sourceCodeURL
         * @property {string|null} [bugTrackerURL] Package bugTrackerURL
         * @property {string|null} [author] Package author
         * @property {string|null} [license] Package license
         * @property {Array.<api.IPackage>|null} [dependencies] Package dependencies
         */

        /**
         * Constructs a new Package.
         * @memberof api
         * @classdesc Represents a Package.
         * @implements IPackage
         * @constructor
         * @param {api.IPackage=} [properties] Properties to set
         */
        function Package(properties) {
            this.dependencies = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Package name.
         * @member {string} name
         * @memberof api.Package
         * @instance
         */
        Package.prototype.name = "";

        /**
         * Package spec.
         * @member {string} spec
         * @memberof api.Package
         * @instance
         */
        Package.prototype.spec = "";

        /**
         * Package description.
         * @member {string} description
         * @memberof api.Package
         * @instance
         */
        Package.prototype.description = "";

        /**
         * Package version.
         * @member {string} version
         * @memberof api.Package
         * @instance
         */
        Package.prototype.version = "";

        /**
         * Package homepageURL.
         * @member {string} homepageURL
         * @memberof api.Package
         * @instance
         */
        Package.prototype.homepageURL = "";

        /**
         * Package documentationURL.
         * @member {string} documentationURL
         * @memberof api.Package
         * @instance
         */
        Package.prototype.documentationURL = "";

        /**
         * Package sourceCodeURL.
         * @member {string} sourceCodeURL
         * @memberof api.Package
         * @instance
         */
        Package.prototype.sourceCodeURL = "";

        /**
         * Package bugTrackerURL.
         * @member {string} bugTrackerURL
         * @memberof api.Package
         * @instance
         */
        Package.prototype.bugTrackerURL = "";

        /**
         * Package author.
         * @member {string} author
         * @memberof api.Package
         * @instance
         */
        Package.prototype.author = "";

        /**
         * Package license.
         * @member {string} license
         * @memberof api.Package
         * @instance
         */
        Package.prototype.license = "";

        /**
         * Package dependencies.
         * @member {Array.<api.IPackage>} dependencies
         * @memberof api.Package
         * @instance
         */
        Package.prototype.dependencies = $util.emptyArray;

        /**
         * Creates a new Package instance using the specified properties.
         * @function create
         * @memberof api.Package
         * @static
         * @param {api.IPackage=} [properties] Properties to set
         * @returns {api.Package} Package instance
         */
        Package.create = function create(properties) {
            return new Package(properties);
        };

        /**
         * Encodes the specified Package message. Does not implicitly {@link api.Package.verify|verify} messages.
         * @function encode
         * @memberof api.Package
         * @static
         * @param {api.IPackage} message Package message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Package.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.name != null && message.hasOwnProperty("name"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);
            if (message.spec != null && message.hasOwnProperty("spec"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.spec);
            if (message.description != null && message.hasOwnProperty("description"))
                writer.uint32(/* id 10, wireType 2 =*/82).string(message.description);
            if (message.version != null && message.hasOwnProperty("version"))
                writer.uint32(/* id 11, wireType 2 =*/90).string(message.version);
            if (message.homepageURL != null && message.hasOwnProperty("homepageURL"))
                writer.uint32(/* id 12, wireType 2 =*/98).string(message.homepageURL);
            if (message.documentationURL != null && message.hasOwnProperty("documentationURL"))
                writer.uint32(/* id 13, wireType 2 =*/106).string(message.documentationURL);
            if (message.sourceCodeURL != null && message.hasOwnProperty("sourceCodeURL"))
                writer.uint32(/* id 14, wireType 2 =*/114).string(message.sourceCodeURL);
            if (message.bugTrackerURL != null && message.hasOwnProperty("bugTrackerURL"))
                writer.uint32(/* id 15, wireType 2 =*/122).string(message.bugTrackerURL);
            if (message.author != null && message.hasOwnProperty("author"))
                writer.uint32(/* id 16, wireType 2 =*/130).string(message.author);
            if (message.license != null && message.hasOwnProperty("license"))
                writer.uint32(/* id 17, wireType 2 =*/138).string(message.license);
            if (message.dependencies != null && message.dependencies.length)
                for (var i = 0; i < message.dependencies.length; ++i)
                    $root.api.Package.encode(message.dependencies[i], writer.uint32(/* id 18, wireType 2 =*/146).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified Package message, length delimited. Does not implicitly {@link api.Package.verify|verify} messages.
         * @function encodeDelimited
         * @memberof api.Package
         * @static
         * @param {api.IPackage} message Package message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Package.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Package message from the specified reader or buffer.
         * @function decode
         * @memberof api.Package
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {api.Package} Package
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Package.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.api.Package();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.name = reader.string();
                    break;
                case 2:
                    message.spec = reader.string();
                    break;
                case 10:
                    message.description = reader.string();
                    break;
                case 11:
                    message.version = reader.string();
                    break;
                case 12:
                    message.homepageURL = reader.string();
                    break;
                case 13:
                    message.documentationURL = reader.string();
                    break;
                case 14:
                    message.sourceCodeURL = reader.string();
                    break;
                case 15:
                    message.bugTrackerURL = reader.string();
                    break;
                case 16:
                    message.author = reader.string();
                    break;
                case 17:
                    message.license = reader.string();
                    break;
                case 18:
                    if (!(message.dependencies && message.dependencies.length))
                        message.dependencies = [];
                    message.dependencies.push($root.api.Package.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Package message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof api.Package
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {api.Package} Package
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Package.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Package message.
         * @function verify
         * @memberof api.Package
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Package.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.name != null && message.hasOwnProperty("name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            if (message.spec != null && message.hasOwnProperty("spec"))
                if (!$util.isString(message.spec))
                    return "spec: string expected";
            if (message.description != null && message.hasOwnProperty("description"))
                if (!$util.isString(message.description))
                    return "description: string expected";
            if (message.version != null && message.hasOwnProperty("version"))
                if (!$util.isString(message.version))
                    return "version: string expected";
            if (message.homepageURL != null && message.hasOwnProperty("homepageURL"))
                if (!$util.isString(message.homepageURL))
                    return "homepageURL: string expected";
            if (message.documentationURL != null && message.hasOwnProperty("documentationURL"))
                if (!$util.isString(message.documentationURL))
                    return "documentationURL: string expected";
            if (message.sourceCodeURL != null && message.hasOwnProperty("sourceCodeURL"))
                if (!$util.isString(message.sourceCodeURL))
                    return "sourceCodeURL: string expected";
            if (message.bugTrackerURL != null && message.hasOwnProperty("bugTrackerURL"))
                if (!$util.isString(message.bugTrackerURL))
                    return "bugTrackerURL: string expected";
            if (message.author != null && message.hasOwnProperty("author"))
                if (!$util.isString(message.author))
                    return "author: string expected";
            if (message.license != null && message.hasOwnProperty("license"))
                if (!$util.isString(message.license))
                    return "license: string expected";
            if (message.dependencies != null && message.hasOwnProperty("dependencies")) {
                if (!Array.isArray(message.dependencies))
                    return "dependencies: array expected";
                for (var i = 0; i < message.dependencies.length; ++i) {
                    var error = $root.api.Package.verify(message.dependencies[i]);
                    if (error)
                        return "dependencies." + error;
                }
            }
            return null;
        };

        /**
         * Creates a Package message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof api.Package
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {api.Package} Package
         */
        Package.fromObject = function fromObject(object) {
            if (object instanceof $root.api.Package)
                return object;
            var message = new $root.api.Package();
            if (object.name != null)
                message.name = String(object.name);
            if (object.spec != null)
                message.spec = String(object.spec);
            if (object.description != null)
                message.description = String(object.description);
            if (object.version != null)
                message.version = String(object.version);
            if (object.homepageURL != null)
                message.homepageURL = String(object.homepageURL);
            if (object.documentationURL != null)
                message.documentationURL = String(object.documentationURL);
            if (object.sourceCodeURL != null)
                message.sourceCodeURL = String(object.sourceCodeURL);
            if (object.bugTrackerURL != null)
                message.bugTrackerURL = String(object.bugTrackerURL);
            if (object.author != null)
                message.author = String(object.author);
            if (object.license != null)
                message.license = String(object.license);
            if (object.dependencies) {
                if (!Array.isArray(object.dependencies))
                    throw TypeError(".api.Package.dependencies: array expected");
                message.dependencies = [];
                for (var i = 0; i < object.dependencies.length; ++i) {
                    if (typeof object.dependencies[i] !== "object")
                        throw TypeError(".api.Package.dependencies: object expected");
                    message.dependencies[i] = $root.api.Package.fromObject(object.dependencies[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a Package message. Also converts values to other types if specified.
         * @function toObject
         * @memberof api.Package
         * @static
         * @param {api.Package} message Package
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Package.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.dependencies = [];
            if (options.defaults) {
                object.name = "";
                object.spec = "";
                object.description = "";
                object.version = "";
                object.homepageURL = "";
                object.documentationURL = "";
                object.sourceCodeURL = "";
                object.bugTrackerURL = "";
                object.author = "";
                object.license = "";
            }
            if (message.name != null && message.hasOwnProperty("name"))
                object.name = message.name;
            if (message.spec != null && message.hasOwnProperty("spec"))
                object.spec = message.spec;
            if (message.description != null && message.hasOwnProperty("description"))
                object.description = message.description;
            if (message.version != null && message.hasOwnProperty("version"))
                object.version = message.version;
            if (message.homepageURL != null && message.hasOwnProperty("homepageURL"))
                object.homepageURL = message.homepageURL;
            if (message.documentationURL != null && message.hasOwnProperty("documentationURL"))
                object.documentationURL = message.documentationURL;
            if (message.sourceCodeURL != null && message.hasOwnProperty("sourceCodeURL"))
                object.sourceCodeURL = message.sourceCodeURL;
            if (message.bugTrackerURL != null && message.hasOwnProperty("bugTrackerURL"))
                object.bugTrackerURL = message.bugTrackerURL;
            if (message.author != null && message.hasOwnProperty("author"))
                object.author = message.author;
            if (message.license != null && message.hasOwnProperty("license"))
                object.license = message.license;
            if (message.dependencies && message.dependencies.length) {
                object.dependencies = [];
                for (var j = 0; j < message.dependencies.length; ++j)
                    object.dependencies[j] = $root.api.Package.toObject(message.dependencies[j], options);
            }
            return object;
        };

        /**
         * Converts this Package to JSON.
         * @function toJSON
         * @memberof api.Package
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Package.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Package;
    })();

    api.PackageSearch = (function() {

        /**
         * Properties of a PackageSearch.
         * @memberof api
         * @interface IPackageSearch
         * @property {string|null} [query] PackageSearch query
         */

        /**
         * Constructs a new PackageSearch.
         * @memberof api
         * @classdesc Represents a PackageSearch.
         * @implements IPackageSearch
         * @constructor
         * @param {api.IPackageSearch=} [properties] Properties to set
         */
        function PackageSearch(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PackageSearch query.
         * @member {string} query
         * @memberof api.PackageSearch
         * @instance
         */
        PackageSearch.prototype.query = "";

        /**
         * Creates a new PackageSearch instance using the specified properties.
         * @function create
         * @memberof api.PackageSearch
         * @static
         * @param {api.IPackageSearch=} [properties] Properties to set
         * @returns {api.PackageSearch} PackageSearch instance
         */
        PackageSearch.create = function create(properties) {
            return new PackageSearch(properties);
        };

        /**
         * Encodes the specified PackageSearch message. Does not implicitly {@link api.PackageSearch.verify|verify} messages.
         * @function encode
         * @memberof api.PackageSearch
         * @static
         * @param {api.IPackageSearch} message PackageSearch message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PackageSearch.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.query != null && message.hasOwnProperty("query"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.query);
            return writer;
        };

        /**
         * Encodes the specified PackageSearch message, length delimited. Does not implicitly {@link api.PackageSearch.verify|verify} messages.
         * @function encodeDelimited
         * @memberof api.PackageSearch
         * @static
         * @param {api.IPackageSearch} message PackageSearch message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PackageSearch.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PackageSearch message from the specified reader or buffer.
         * @function decode
         * @memberof api.PackageSearch
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {api.PackageSearch} PackageSearch
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PackageSearch.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.api.PackageSearch();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.query = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PackageSearch message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof api.PackageSearch
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {api.PackageSearch} PackageSearch
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PackageSearch.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PackageSearch message.
         * @function verify
         * @memberof api.PackageSearch
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PackageSearch.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.query != null && message.hasOwnProperty("query"))
                if (!$util.isString(message.query))
                    return "query: string expected";
            return null;
        };

        /**
         * Creates a PackageSearch message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof api.PackageSearch
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {api.PackageSearch} PackageSearch
         */
        PackageSearch.fromObject = function fromObject(object) {
            if (object instanceof $root.api.PackageSearch)
                return object;
            var message = new $root.api.PackageSearch();
            if (object.query != null)
                message.query = String(object.query);
            return message;
        };

        /**
         * Creates a plain object from a PackageSearch message. Also converts values to other types if specified.
         * @function toObject
         * @memberof api.PackageSearch
         * @static
         * @param {api.PackageSearch} message PackageSearch
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PackageSearch.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.query = "";
            if (message.query != null && message.hasOwnProperty("query"))
                object.query = message.query;
            return object;
        };

        /**
         * Converts this PackageSearch to JSON.
         * @function toJSON
         * @memberof api.PackageSearch
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PackageSearch.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return PackageSearch;
    })();

    api.PackageSearchResp = (function() {

        /**
         * Properties of a PackageSearchResp.
         * @memberof api
         * @interface IPackageSearchResp
         * @property {Array.<api.IPackage>|null} [results] PackageSearchResp results
         */

        /**
         * Constructs a new PackageSearchResp.
         * @memberof api
         * @classdesc Represents a PackageSearchResp.
         * @implements IPackageSearchResp
         * @constructor
         * @param {api.IPackageSearchResp=} [properties] Properties to set
         */
        function PackageSearchResp(properties) {
            this.results = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PackageSearchResp results.
         * @member {Array.<api.IPackage>} results
         * @memberof api.PackageSearchResp
         * @instance
         */
        PackageSearchResp.prototype.results = $util.emptyArray;

        /**
         * Creates a new PackageSearchResp instance using the specified properties.
         * @function create
         * @memberof api.PackageSearchResp
         * @static
         * @param {api.IPackageSearchResp=} [properties] Properties to set
         * @returns {api.PackageSearchResp} PackageSearchResp instance
         */
        PackageSearchResp.create = function create(properties) {
            return new PackageSearchResp(properties);
        };

        /**
         * Encodes the specified PackageSearchResp message. Does not implicitly {@link api.PackageSearchResp.verify|verify} messages.
         * @function encode
         * @memberof api.PackageSearchResp
         * @static
         * @param {api.IPackageSearchResp} message PackageSearchResp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PackageSearchResp.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.results != null && message.results.length)
                for (var i = 0; i < message.results.length; ++i)
                    $root.api.Package.encode(message.results[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified PackageSearchResp message, length delimited. Does not implicitly {@link api.PackageSearchResp.verify|verify} messages.
         * @function encodeDelimited
         * @memberof api.PackageSearchResp
         * @static
         * @param {api.IPackageSearchResp} message PackageSearchResp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PackageSearchResp.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PackageSearchResp message from the specified reader or buffer.
         * @function decode
         * @memberof api.PackageSearchResp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {api.PackageSearchResp} PackageSearchResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PackageSearchResp.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.api.PackageSearchResp();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.results && message.results.length))
                        message.results = [];
                    message.results.push($root.api.Package.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PackageSearchResp message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof api.PackageSearchResp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {api.PackageSearchResp} PackageSearchResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PackageSearchResp.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PackageSearchResp message.
         * @function verify
         * @memberof api.PackageSearchResp
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PackageSearchResp.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.results != null && message.hasOwnProperty("results")) {
                if (!Array.isArray(message.results))
                    return "results: array expected";
                for (var i = 0; i < message.results.length; ++i) {
                    var error = $root.api.Package.verify(message.results[i]);
                    if (error)
                        return "results." + error;
                }
            }
            return null;
        };

        /**
         * Creates a PackageSearchResp message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof api.PackageSearchResp
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {api.PackageSearchResp} PackageSearchResp
         */
        PackageSearchResp.fromObject = function fromObject(object) {
            if (object instanceof $root.api.PackageSearchResp)
                return object;
            var message = new $root.api.PackageSearchResp();
            if (object.results) {
                if (!Array.isArray(object.results))
                    throw TypeError(".api.PackageSearchResp.results: array expected");
                message.results = [];
                for (var i = 0; i < object.results.length; ++i) {
                    if (typeof object.results[i] !== "object")
                        throw TypeError(".api.PackageSearchResp.results: object expected");
                    message.results[i] = $root.api.Package.fromObject(object.results[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a PackageSearchResp message. Also converts values to other types if specified.
         * @function toObject
         * @memberof api.PackageSearchResp
         * @static
         * @param {api.PackageSearchResp} message PackageSearchResp
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PackageSearchResp.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.results = [];
            if (message.results && message.results.length) {
                object.results = [];
                for (var j = 0; j < message.results.length; ++j)
                    object.results[j] = $root.api.Package.toObject(message.results[j], options);
            }
            return object;
        };

        /**
         * Converts this PackageSearchResp to JSON.
         * @function toJSON
         * @memberof api.PackageSearchResp
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PackageSearchResp.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return PackageSearchResp;
    })();

    api.PackageInfo = (function() {

        /**
         * Properties of a PackageInfo.
         * @memberof api
         * @interface IPackageInfo
         * @property {api.IPackage|null} [pkg] PackageInfo pkg
         */

        /**
         * Constructs a new PackageInfo.
         * @memberof api
         * @classdesc Represents a PackageInfo.
         * @implements IPackageInfo
         * @constructor
         * @param {api.IPackageInfo=} [properties] Properties to set
         */
        function PackageInfo(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PackageInfo pkg.
         * @member {api.IPackage|null|undefined} pkg
         * @memberof api.PackageInfo
         * @instance
         */
        PackageInfo.prototype.pkg = null;

        /**
         * Creates a new PackageInfo instance using the specified properties.
         * @function create
         * @memberof api.PackageInfo
         * @static
         * @param {api.IPackageInfo=} [properties] Properties to set
         * @returns {api.PackageInfo} PackageInfo instance
         */
        PackageInfo.create = function create(properties) {
            return new PackageInfo(properties);
        };

        /**
         * Encodes the specified PackageInfo message. Does not implicitly {@link api.PackageInfo.verify|verify} messages.
         * @function encode
         * @memberof api.PackageInfo
         * @static
         * @param {api.IPackageInfo} message PackageInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PackageInfo.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.pkg != null && message.hasOwnProperty("pkg"))
                $root.api.Package.encode(message.pkg, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified PackageInfo message, length delimited. Does not implicitly {@link api.PackageInfo.verify|verify} messages.
         * @function encodeDelimited
         * @memberof api.PackageInfo
         * @static
         * @param {api.IPackageInfo} message PackageInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PackageInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PackageInfo message from the specified reader or buffer.
         * @function decode
         * @memberof api.PackageInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {api.PackageInfo} PackageInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PackageInfo.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.api.PackageInfo();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.pkg = $root.api.Package.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PackageInfo message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof api.PackageInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {api.PackageInfo} PackageInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PackageInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PackageInfo message.
         * @function verify
         * @memberof api.PackageInfo
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PackageInfo.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.pkg != null && message.hasOwnProperty("pkg")) {
                var error = $root.api.Package.verify(message.pkg);
                if (error)
                    return "pkg." + error;
            }
            return null;
        };

        /**
         * Creates a PackageInfo message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof api.PackageInfo
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {api.PackageInfo} PackageInfo
         */
        PackageInfo.fromObject = function fromObject(object) {
            if (object instanceof $root.api.PackageInfo)
                return object;
            var message = new $root.api.PackageInfo();
            if (object.pkg != null) {
                if (typeof object.pkg !== "object")
                    throw TypeError(".api.PackageInfo.pkg: object expected");
                message.pkg = $root.api.Package.fromObject(object.pkg);
            }
            return message;
        };

        /**
         * Creates a plain object from a PackageInfo message. Also converts values to other types if specified.
         * @function toObject
         * @memberof api.PackageInfo
         * @static
         * @param {api.PackageInfo} message PackageInfo
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PackageInfo.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.pkg = null;
            if (message.pkg != null && message.hasOwnProperty("pkg"))
                object.pkg = $root.api.Package.toObject(message.pkg, options);
            return object;
        };

        /**
         * Converts this PackageInfo to JSON.
         * @function toJSON
         * @memberof api.PackageInfo
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PackageInfo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return PackageInfo;
    })();

    api.PackageInfoResp = (function() {

        /**
         * Properties of a PackageInfoResp.
         * @memberof api
         * @interface IPackageInfoResp
         * @property {api.IPackage|null} [pkg] PackageInfoResp pkg
         */

        /**
         * Constructs a new PackageInfoResp.
         * @memberof api
         * @classdesc Represents a PackageInfoResp.
         * @implements IPackageInfoResp
         * @constructor
         * @param {api.IPackageInfoResp=} [properties] Properties to set
         */
        function PackageInfoResp(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PackageInfoResp pkg.
         * @member {api.IPackage|null|undefined} pkg
         * @memberof api.PackageInfoResp
         * @instance
         */
        PackageInfoResp.prototype.pkg = null;

        /**
         * Creates a new PackageInfoResp instance using the specified properties.
         * @function create
         * @memberof api.PackageInfoResp
         * @static
         * @param {api.IPackageInfoResp=} [properties] Properties to set
         * @returns {api.PackageInfoResp} PackageInfoResp instance
         */
        PackageInfoResp.create = function create(properties) {
            return new PackageInfoResp(properties);
        };

        /**
         * Encodes the specified PackageInfoResp message. Does not implicitly {@link api.PackageInfoResp.verify|verify} messages.
         * @function encode
         * @memberof api.PackageInfoResp
         * @static
         * @param {api.IPackageInfoResp} message PackageInfoResp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PackageInfoResp.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.pkg != null && message.hasOwnProperty("pkg"))
                $root.api.Package.encode(message.pkg, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified PackageInfoResp message, length delimited. Does not implicitly {@link api.PackageInfoResp.verify|verify} messages.
         * @function encodeDelimited
         * @memberof api.PackageInfoResp
         * @static
         * @param {api.IPackageInfoResp} message PackageInfoResp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PackageInfoResp.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PackageInfoResp message from the specified reader or buffer.
         * @function decode
         * @memberof api.PackageInfoResp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {api.PackageInfoResp} PackageInfoResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PackageInfoResp.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.api.PackageInfoResp();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.pkg = $root.api.Package.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PackageInfoResp message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof api.PackageInfoResp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {api.PackageInfoResp} PackageInfoResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PackageInfoResp.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PackageInfoResp message.
         * @function verify
         * @memberof api.PackageInfoResp
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PackageInfoResp.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.pkg != null && message.hasOwnProperty("pkg")) {
                var error = $root.api.Package.verify(message.pkg);
                if (error)
                    return "pkg." + error;
            }
            return null;
        };

        /**
         * Creates a PackageInfoResp message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof api.PackageInfoResp
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {api.PackageInfoResp} PackageInfoResp
         */
        PackageInfoResp.fromObject = function fromObject(object) {
            if (object instanceof $root.api.PackageInfoResp)
                return object;
            var message = new $root.api.PackageInfoResp();
            if (object.pkg != null) {
                if (typeof object.pkg !== "object")
                    throw TypeError(".api.PackageInfoResp.pkg: object expected");
                message.pkg = $root.api.Package.fromObject(object.pkg);
            }
            return message;
        };

        /**
         * Creates a plain object from a PackageInfoResp message. Also converts values to other types if specified.
         * @function toObject
         * @memberof api.PackageInfoResp
         * @static
         * @param {api.PackageInfoResp} message PackageInfoResp
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PackageInfoResp.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.pkg = null;
            if (message.pkg != null && message.hasOwnProperty("pkg"))
                object.pkg = $root.api.Package.toObject(message.pkg, options);
            return object;
        };

        /**
         * Converts this PackageInfoResp to JSON.
         * @function toJSON
         * @memberof api.PackageInfoResp
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PackageInfoResp.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return PackageInfoResp;
    })();

    api.PackageAdd = (function() {

        /**
         * Properties of a PackageAdd.
         * @memberof api
         * @interface IPackageAdd
         * @property {Array.<api.IPackage>|null} [pkgs] PackageAdd pkgs
         */

        /**
         * Constructs a new PackageAdd.
         * @memberof api
         * @classdesc Represents a PackageAdd.
         * @implements IPackageAdd
         * @constructor
         * @param {api.IPackageAdd=} [properties] Properties to set
         */
        function PackageAdd(properties) {
            this.pkgs = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PackageAdd pkgs.
         * @member {Array.<api.IPackage>} pkgs
         * @memberof api.PackageAdd
         * @instance
         */
        PackageAdd.prototype.pkgs = $util.emptyArray;

        /**
         * Creates a new PackageAdd instance using the specified properties.
         * @function create
         * @memberof api.PackageAdd
         * @static
         * @param {api.IPackageAdd=} [properties] Properties to set
         * @returns {api.PackageAdd} PackageAdd instance
         */
        PackageAdd.create = function create(properties) {
            return new PackageAdd(properties);
        };

        /**
         * Encodes the specified PackageAdd message. Does not implicitly {@link api.PackageAdd.verify|verify} messages.
         * @function encode
         * @memberof api.PackageAdd
         * @static
         * @param {api.IPackageAdd} message PackageAdd message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PackageAdd.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.pkgs != null && message.pkgs.length)
                for (var i = 0; i < message.pkgs.length; ++i)
                    $root.api.Package.encode(message.pkgs[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified PackageAdd message, length delimited. Does not implicitly {@link api.PackageAdd.verify|verify} messages.
         * @function encodeDelimited
         * @memberof api.PackageAdd
         * @static
         * @param {api.IPackageAdd} message PackageAdd message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PackageAdd.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PackageAdd message from the specified reader or buffer.
         * @function decode
         * @memberof api.PackageAdd
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {api.PackageAdd} PackageAdd
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PackageAdd.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.api.PackageAdd();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.pkgs && message.pkgs.length))
                        message.pkgs = [];
                    message.pkgs.push($root.api.Package.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PackageAdd message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof api.PackageAdd
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {api.PackageAdd} PackageAdd
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PackageAdd.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PackageAdd message.
         * @function verify
         * @memberof api.PackageAdd
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PackageAdd.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.pkgs != null && message.hasOwnProperty("pkgs")) {
                if (!Array.isArray(message.pkgs))
                    return "pkgs: array expected";
                for (var i = 0; i < message.pkgs.length; ++i) {
                    var error = $root.api.Package.verify(message.pkgs[i]);
                    if (error)
                        return "pkgs." + error;
                }
            }
            return null;
        };

        /**
         * Creates a PackageAdd message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof api.PackageAdd
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {api.PackageAdd} PackageAdd
         */
        PackageAdd.fromObject = function fromObject(object) {
            if (object instanceof $root.api.PackageAdd)
                return object;
            var message = new $root.api.PackageAdd();
            if (object.pkgs) {
                if (!Array.isArray(object.pkgs))
                    throw TypeError(".api.PackageAdd.pkgs: array expected");
                message.pkgs = [];
                for (var i = 0; i < object.pkgs.length; ++i) {
                    if (typeof object.pkgs[i] !== "object")
                        throw TypeError(".api.PackageAdd.pkgs: object expected");
                    message.pkgs[i] = $root.api.Package.fromObject(object.pkgs[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a PackageAdd message. Also converts values to other types if specified.
         * @function toObject
         * @memberof api.PackageAdd
         * @static
         * @param {api.PackageAdd} message PackageAdd
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PackageAdd.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.pkgs = [];
            if (message.pkgs && message.pkgs.length) {
                object.pkgs = [];
                for (var j = 0; j < message.pkgs.length; ++j)
                    object.pkgs[j] = $root.api.Package.toObject(message.pkgs[j], options);
            }
            return object;
        };

        /**
         * Converts this PackageAdd to JSON.
         * @function toJSON
         * @memberof api.PackageAdd
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PackageAdd.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return PackageAdd;
    })();

    api.PackageRemove = (function() {

        /**
         * Properties of a PackageRemove.
         * @memberof api
         * @interface IPackageRemove
         * @property {Array.<api.IPackage>|null} [pkgs] PackageRemove pkgs
         */

        /**
         * Constructs a new PackageRemove.
         * @memberof api
         * @classdesc Represents a PackageRemove.
         * @implements IPackageRemove
         * @constructor
         * @param {api.IPackageRemove=} [properties] Properties to set
         */
        function PackageRemove(properties) {
            this.pkgs = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PackageRemove pkgs.
         * @member {Array.<api.IPackage>} pkgs
         * @memberof api.PackageRemove
         * @instance
         */
        PackageRemove.prototype.pkgs = $util.emptyArray;

        /**
         * Creates a new PackageRemove instance using the specified properties.
         * @function create
         * @memberof api.PackageRemove
         * @static
         * @param {api.IPackageRemove=} [properties] Properties to set
         * @returns {api.PackageRemove} PackageRemove instance
         */
        PackageRemove.create = function create(properties) {
            return new PackageRemove(properties);
        };

        /**
         * Encodes the specified PackageRemove message. Does not implicitly {@link api.PackageRemove.verify|verify} messages.
         * @function encode
         * @memberof api.PackageRemove
         * @static
         * @param {api.IPackageRemove} message PackageRemove message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PackageRemove.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.pkgs != null && message.pkgs.length)
                for (var i = 0; i < message.pkgs.length; ++i)
                    $root.api.Package.encode(message.pkgs[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified PackageRemove message, length delimited. Does not implicitly {@link api.PackageRemove.verify|verify} messages.
         * @function encodeDelimited
         * @memberof api.PackageRemove
         * @static
         * @param {api.IPackageRemove} message PackageRemove message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PackageRemove.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PackageRemove message from the specified reader or buffer.
         * @function decode
         * @memberof api.PackageRemove
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {api.PackageRemove} PackageRemove
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PackageRemove.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.api.PackageRemove();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.pkgs && message.pkgs.length))
                        message.pkgs = [];
                    message.pkgs.push($root.api.Package.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PackageRemove message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof api.PackageRemove
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {api.PackageRemove} PackageRemove
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PackageRemove.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PackageRemove message.
         * @function verify
         * @memberof api.PackageRemove
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PackageRemove.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.pkgs != null && message.hasOwnProperty("pkgs")) {
                if (!Array.isArray(message.pkgs))
                    return "pkgs: array expected";
                for (var i = 0; i < message.pkgs.length; ++i) {
                    var error = $root.api.Package.verify(message.pkgs[i]);
                    if (error)
                        return "pkgs." + error;
                }
            }
            return null;
        };

        /**
         * Creates a PackageRemove message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof api.PackageRemove
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {api.PackageRemove} PackageRemove
         */
        PackageRemove.fromObject = function fromObject(object) {
            if (object instanceof $root.api.PackageRemove)
                return object;
            var message = new $root.api.PackageRemove();
            if (object.pkgs) {
                if (!Array.isArray(object.pkgs))
                    throw TypeError(".api.PackageRemove.pkgs: array expected");
                message.pkgs = [];
                for (var i = 0; i < object.pkgs.length; ++i) {
                    if (typeof object.pkgs[i] !== "object")
                        throw TypeError(".api.PackageRemove.pkgs: object expected");
                    message.pkgs[i] = $root.api.Package.fromObject(object.pkgs[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a PackageRemove message. Also converts values to other types if specified.
         * @function toObject
         * @memberof api.PackageRemove
         * @static
         * @param {api.PackageRemove} message PackageRemove
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PackageRemove.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.pkgs = [];
            if (message.pkgs && message.pkgs.length) {
                object.pkgs = [];
                for (var j = 0; j < message.pkgs.length; ++j)
                    object.pkgs[j] = $root.api.Package.toObject(message.pkgs[j], options);
            }
            return object;
        };

        /**
         * Converts this PackageRemove to JSON.
         * @function toJSON
         * @memberof api.PackageRemove
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PackageRemove.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return PackageRemove;
    })();

    api.PackageInstall = (function() {

        /**
         * Properties of a PackageInstall.
         * @memberof api
         * @interface IPackageInstall
         */

        /**
         * Constructs a new PackageInstall.
         * @memberof api
         * @classdesc Represents a PackageInstall.
         * @implements IPackageInstall
         * @constructor
         * @param {api.IPackageInstall=} [properties] Properties to set
         */
        function PackageInstall(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new PackageInstall instance using the specified properties.
         * @function create
         * @memberof api.PackageInstall
         * @static
         * @param {api.IPackageInstall=} [properties] Properties to set
         * @returns {api.PackageInstall} PackageInstall instance
         */
        PackageInstall.create = function create(properties) {
            return new PackageInstall(properties);
        };

        /**
         * Encodes the specified PackageInstall message. Does not implicitly {@link api.PackageInstall.verify|verify} messages.
         * @function encode
         * @memberof api.PackageInstall
         * @static
         * @param {api.IPackageInstall} message PackageInstall message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PackageInstall.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified PackageInstall message, length delimited. Does not implicitly {@link api.PackageInstall.verify|verify} messages.
         * @function encodeDelimited
         * @memberof api.PackageInstall
         * @static
         * @param {api.IPackageInstall} message PackageInstall message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PackageInstall.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PackageInstall message from the specified reader or buffer.
         * @function decode
         * @memberof api.PackageInstall
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {api.PackageInstall} PackageInstall
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PackageInstall.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.api.PackageInstall();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PackageInstall message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof api.PackageInstall
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {api.PackageInstall} PackageInstall
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PackageInstall.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PackageInstall message.
         * @function verify
         * @memberof api.PackageInstall
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PackageInstall.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a PackageInstall message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof api.PackageInstall
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {api.PackageInstall} PackageInstall
         */
        PackageInstall.fromObject = function fromObject(object) {
            if (object instanceof $root.api.PackageInstall)
                return object;
            return new $root.api.PackageInstall();
        };

        /**
         * Creates a plain object from a PackageInstall message. Also converts values to other types if specified.
         * @function toObject
         * @memberof api.PackageInstall
         * @static
         * @param {api.PackageInstall} message PackageInstall
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PackageInstall.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this PackageInstall to JSON.
         * @function toJSON
         * @memberof api.PackageInstall
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PackageInstall.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return PackageInstall;
    })();

    api.PackageListSpecfile = (function() {

        /**
         * Properties of a PackageListSpecfile.
         * @memberof api
         * @interface IPackageListSpecfile
         */

        /**
         * Constructs a new PackageListSpecfile.
         * @memberof api
         * @classdesc Represents a PackageListSpecfile.
         * @implements IPackageListSpecfile
         * @constructor
         * @param {api.IPackageListSpecfile=} [properties] Properties to set
         */
        function PackageListSpecfile(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new PackageListSpecfile instance using the specified properties.
         * @function create
         * @memberof api.PackageListSpecfile
         * @static
         * @param {api.IPackageListSpecfile=} [properties] Properties to set
         * @returns {api.PackageListSpecfile} PackageListSpecfile instance
         */
        PackageListSpecfile.create = function create(properties) {
            return new PackageListSpecfile(properties);
        };

        /**
         * Encodes the specified PackageListSpecfile message. Does not implicitly {@link api.PackageListSpecfile.verify|verify} messages.
         * @function encode
         * @memberof api.PackageListSpecfile
         * @static
         * @param {api.IPackageListSpecfile} message PackageListSpecfile message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PackageListSpecfile.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified PackageListSpecfile message, length delimited. Does not implicitly {@link api.PackageListSpecfile.verify|verify} messages.
         * @function encodeDelimited
         * @memberof api.PackageListSpecfile
         * @static
         * @param {api.IPackageListSpecfile} message PackageListSpecfile message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PackageListSpecfile.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PackageListSpecfile message from the specified reader or buffer.
         * @function decode
         * @memberof api.PackageListSpecfile
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {api.PackageListSpecfile} PackageListSpecfile
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PackageListSpecfile.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.api.PackageListSpecfile();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PackageListSpecfile message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof api.PackageListSpecfile
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {api.PackageListSpecfile} PackageListSpecfile
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PackageListSpecfile.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PackageListSpecfile message.
         * @function verify
         * @memberof api.PackageListSpecfile
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PackageListSpecfile.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a PackageListSpecfile message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof api.PackageListSpecfile
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {api.PackageListSpecfile} PackageListSpecfile
         */
        PackageListSpecfile.fromObject = function fromObject(object) {
            if (object instanceof $root.api.PackageListSpecfile)
                return object;
            return new $root.api.PackageListSpecfile();
        };

        /**
         * Creates a plain object from a PackageListSpecfile message. Also converts values to other types if specified.
         * @function toObject
         * @memberof api.PackageListSpecfile
         * @static
         * @param {api.PackageListSpecfile} message PackageListSpecfile
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PackageListSpecfile.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this PackageListSpecfile to JSON.
         * @function toJSON
         * @memberof api.PackageListSpecfile
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PackageListSpecfile.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return PackageListSpecfile;
    })();

    api.PackageListSpecfileResp = (function() {

        /**
         * Properties of a PackageListSpecfileResp.
         * @memberof api
         * @interface IPackageListSpecfileResp
         * @property {Array.<api.IPackage>|null} [pkgs] PackageListSpecfileResp pkgs
         */

        /**
         * Constructs a new PackageListSpecfileResp.
         * @memberof api
         * @classdesc Represents a PackageListSpecfileResp.
         * @implements IPackageListSpecfileResp
         * @constructor
         * @param {api.IPackageListSpecfileResp=} [properties] Properties to set
         */
        function PackageListSpecfileResp(properties) {
            this.pkgs = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PackageListSpecfileResp pkgs.
         * @member {Array.<api.IPackage>} pkgs
         * @memberof api.PackageListSpecfileResp
         * @instance
         */
        PackageListSpecfileResp.prototype.pkgs = $util.emptyArray;

        /**
         * Creates a new PackageListSpecfileResp instance using the specified properties.
         * @function create
         * @memberof api.PackageListSpecfileResp
         * @static
         * @param {api.IPackageListSpecfileResp=} [properties] Properties to set
         * @returns {api.PackageListSpecfileResp} PackageListSpecfileResp instance
         */
        PackageListSpecfileResp.create = function create(properties) {
            return new PackageListSpecfileResp(properties);
        };

        /**
         * Encodes the specified PackageListSpecfileResp message. Does not implicitly {@link api.PackageListSpecfileResp.verify|verify} messages.
         * @function encode
         * @memberof api.PackageListSpecfileResp
         * @static
         * @param {api.IPackageListSpecfileResp} message PackageListSpecfileResp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PackageListSpecfileResp.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.pkgs != null && message.pkgs.length)
                for (var i = 0; i < message.pkgs.length; ++i)
                    $root.api.Package.encode(message.pkgs[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified PackageListSpecfileResp message, length delimited. Does not implicitly {@link api.PackageListSpecfileResp.verify|verify} messages.
         * @function encodeDelimited
         * @memberof api.PackageListSpecfileResp
         * @static
         * @param {api.IPackageListSpecfileResp} message PackageListSpecfileResp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PackageListSpecfileResp.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PackageListSpecfileResp message from the specified reader or buffer.
         * @function decode
         * @memberof api.PackageListSpecfileResp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {api.PackageListSpecfileResp} PackageListSpecfileResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PackageListSpecfileResp.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.api.PackageListSpecfileResp();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.pkgs && message.pkgs.length))
                        message.pkgs = [];
                    message.pkgs.push($root.api.Package.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PackageListSpecfileResp message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof api.PackageListSpecfileResp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {api.PackageListSpecfileResp} PackageListSpecfileResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PackageListSpecfileResp.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PackageListSpecfileResp message.
         * @function verify
         * @memberof api.PackageListSpecfileResp
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PackageListSpecfileResp.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.pkgs != null && message.hasOwnProperty("pkgs")) {
                if (!Array.isArray(message.pkgs))
                    return "pkgs: array expected";
                for (var i = 0; i < message.pkgs.length; ++i) {
                    var error = $root.api.Package.verify(message.pkgs[i]);
                    if (error)
                        return "pkgs." + error;
                }
            }
            return null;
        };

        /**
         * Creates a PackageListSpecfileResp message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof api.PackageListSpecfileResp
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {api.PackageListSpecfileResp} PackageListSpecfileResp
         */
        PackageListSpecfileResp.fromObject = function fromObject(object) {
            if (object instanceof $root.api.PackageListSpecfileResp)
                return object;
            var message = new $root.api.PackageListSpecfileResp();
            if (object.pkgs) {
                if (!Array.isArray(object.pkgs))
                    throw TypeError(".api.PackageListSpecfileResp.pkgs: array expected");
                message.pkgs = [];
                for (var i = 0; i < object.pkgs.length; ++i) {
                    if (typeof object.pkgs[i] !== "object")
                        throw TypeError(".api.PackageListSpecfileResp.pkgs: object expected");
                    message.pkgs[i] = $root.api.Package.fromObject(object.pkgs[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a PackageListSpecfileResp message. Also converts values to other types if specified.
         * @function toObject
         * @memberof api.PackageListSpecfileResp
         * @static
         * @param {api.PackageListSpecfileResp} message PackageListSpecfileResp
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PackageListSpecfileResp.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.pkgs = [];
            if (message.pkgs && message.pkgs.length) {
                object.pkgs = [];
                for (var j = 0; j < message.pkgs.length; ++j)
                    object.pkgs[j] = $root.api.Package.toObject(message.pkgs[j], options);
            }
            return object;
        };

        /**
         * Converts this PackageListSpecfileResp to JSON.
         * @function toJSON
         * @memberof api.PackageListSpecfileResp
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PackageListSpecfileResp.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return PackageListSpecfileResp;
    })();

    api.PackageCacheSave = (function() {

        /**
         * Properties of a PackageCacheSave.
         * @memberof api
         * @interface IPackageCacheSave
         */

        /**
         * Constructs a new PackageCacheSave.
         * @memberof api
         * @classdesc Represents a PackageCacheSave.
         * @implements IPackageCacheSave
         * @constructor
         * @param {api.IPackageCacheSave=} [properties] Properties to set
         */
        function PackageCacheSave(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new PackageCacheSave instance using the specified properties.
         * @function create
         * @memberof api.PackageCacheSave
         * @static
         * @param {api.IPackageCacheSave=} [properties] Properties to set
         * @returns {api.PackageCacheSave} PackageCacheSave instance
         */
        PackageCacheSave.create = function create(properties) {
            return new PackageCacheSave(properties);
        };

        /**
         * Encodes the specified PackageCacheSave message. Does not implicitly {@link api.PackageCacheSave.verify|verify} messages.
         * @function encode
         * @memberof api.PackageCacheSave
         * @static
         * @param {api.IPackageCacheSave} message PackageCacheSave message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PackageCacheSave.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified PackageCacheSave message, length delimited. Does not implicitly {@link api.PackageCacheSave.verify|verify} messages.
         * @function encodeDelimited
         * @memberof api.PackageCacheSave
         * @static
         * @param {api.IPackageCacheSave} message PackageCacheSave message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PackageCacheSave.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PackageCacheSave message from the specified reader or buffer.
         * @function decode
         * @memberof api.PackageCacheSave
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {api.PackageCacheSave} PackageCacheSave
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PackageCacheSave.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.api.PackageCacheSave();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PackageCacheSave message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof api.PackageCacheSave
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {api.PackageCacheSave} PackageCacheSave
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PackageCacheSave.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PackageCacheSave message.
         * @function verify
         * @memberof api.PackageCacheSave
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PackageCacheSave.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a PackageCacheSave message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof api.PackageCacheSave
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {api.PackageCacheSave} PackageCacheSave
         */
        PackageCacheSave.fromObject = function fromObject(object) {
            if (object instanceof $root.api.PackageCacheSave)
                return object;
            return new $root.api.PackageCacheSave();
        };

        /**
         * Creates a plain object from a PackageCacheSave message. Also converts values to other types if specified.
         * @function toObject
         * @memberof api.PackageCacheSave
         * @static
         * @param {api.PackageCacheSave} message PackageCacheSave
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PackageCacheSave.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this PackageCacheSave to JSON.
         * @function toJSON
         * @memberof api.PackageCacheSave
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PackageCacheSave.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return PackageCacheSave;
    })();

    api.ChatScrollback = (function() {

        /**
         * Properties of a ChatScrollback.
         * @memberof api
         * @interface IChatScrollback
         * @property {Array.<api.IChatMessage>|null} [scrollback] ChatScrollback scrollback
         */

        /**
         * Constructs a new ChatScrollback.
         * @memberof api
         * @classdesc Represents a ChatScrollback.
         * @implements IChatScrollback
         * @constructor
         * @param {api.IChatScrollback=} [properties] Properties to set
         */
        function ChatScrollback(properties) {
            this.scrollback = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ChatScrollback scrollback.
         * @member {Array.<api.IChatMessage>} scrollback
         * @memberof api.ChatScrollback
         * @instance
         */
        ChatScrollback.prototype.scrollback = $util.emptyArray;

        /**
         * Creates a new ChatScrollback instance using the specified properties.
         * @function create
         * @memberof api.ChatScrollback
         * @static
         * @param {api.IChatScrollback=} [properties] Properties to set
         * @returns {api.ChatScrollback} ChatScrollback instance
         */
        ChatScrollback.create = function create(properties) {
            return new ChatScrollback(properties);
        };

        /**
         * Encodes the specified ChatScrollback message. Does not implicitly {@link api.ChatScrollback.verify|verify} messages.
         * @function encode
         * @memberof api.ChatScrollback
         * @static
         * @param {api.IChatScrollback} message ChatScrollback message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ChatScrollback.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.scrollback != null && message.scrollback.length)
                for (var i = 0; i < message.scrollback.length; ++i)
                    $root.api.ChatMessage.encode(message.scrollback[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified ChatScrollback message, length delimited. Does not implicitly {@link api.ChatScrollback.verify|verify} messages.
         * @function encodeDelimited
         * @memberof api.ChatScrollback
         * @static
         * @param {api.IChatScrollback} message ChatScrollback message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ChatScrollback.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ChatScrollback message from the specified reader or buffer.
         * @function decode
         * @memberof api.ChatScrollback
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {api.ChatScrollback} ChatScrollback
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ChatScrollback.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.api.ChatScrollback();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.scrollback && message.scrollback.length))
                        message.scrollback = [];
                    message.scrollback.push($root.api.ChatMessage.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a ChatScrollback message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof api.ChatScrollback
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {api.ChatScrollback} ChatScrollback
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ChatScrollback.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ChatScrollback message.
         * @function verify
         * @memberof api.ChatScrollback
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ChatScrollback.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.scrollback != null && message.hasOwnProperty("scrollback")) {
                if (!Array.isArray(message.scrollback))
                    return "scrollback: array expected";
                for (var i = 0; i < message.scrollback.length; ++i) {
                    var error = $root.api.ChatMessage.verify(message.scrollback[i]);
                    if (error)
                        return "scrollback." + error;
                }
            }
            return null;
        };

        /**
         * Creates a ChatScrollback message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof api.ChatScrollback
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {api.ChatScrollback} ChatScrollback
         */
        ChatScrollback.fromObject = function fromObject(object) {
            if (object instanceof $root.api.ChatScrollback)
                return object;
            var message = new $root.api.ChatScrollback();
            if (object.scrollback) {
                if (!Array.isArray(object.scrollback))
                    throw TypeError(".api.ChatScrollback.scrollback: array expected");
                message.scrollback = [];
                for (var i = 0; i < object.scrollback.length; ++i) {
                    if (typeof object.scrollback[i] !== "object")
                        throw TypeError(".api.ChatScrollback.scrollback: object expected");
                    message.scrollback[i] = $root.api.ChatMessage.fromObject(object.scrollback[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a ChatScrollback message. Also converts values to other types if specified.
         * @function toObject
         * @memberof api.ChatScrollback
         * @static
         * @param {api.ChatScrollback} message ChatScrollback
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ChatScrollback.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.scrollback = [];
            if (message.scrollback && message.scrollback.length) {
                object.scrollback = [];
                for (var j = 0; j < message.scrollback.length; ++j)
                    object.scrollback[j] = $root.api.ChatMessage.toObject(message.scrollback[j], options);
            }
            return object;
        };

        /**
         * Converts this ChatScrollback to JSON.
         * @function toJSON
         * @memberof api.ChatScrollback
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ChatScrollback.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return ChatScrollback;
    })();

    return api;
})();

module.exports = $root;
