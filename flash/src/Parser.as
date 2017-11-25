package {
import com.opensource.svga.MovieEntity;
import com.opensource.svga.MovieParams;

import encoding.base64.Base64Encoder;
import encoding.base64.encodeBase64bytes;

import flash.errors.IOError;

import flash.events.Event;
import flash.events.IOErrorEvent;
import flash.events.SecurityErrorEvent;
import flash.external.ExternalInterface;
import flash.net.URLLoader;
import flash.net.URLLoaderDataFormat;
import flash.net.URLRequest;
import flash.utils.ByteArray;
import flash.utils.CompressionAlgorithm;
import flash.utils.clearInterval;
import flash.utils.setInterval;

public class Parser {
    private var _prefix:String;

    public function Parser(prefix:String = '') {
        this._prefix = prefix;
        if (ExternalInterface.available) {
            ExternalInterface.addCallback('load', this.load);
            ExternalInterface.call('window.' + prefix + '.complete');
        }
    }

    private function load(url:String = '', id:Number = -1):void {
        if (url == '' || !url) {
            return;
        }

        var _me:Parser = this;
        var request:URLRequest = new URLRequest(url);
        var loader:URLLoader = new URLLoader();
        loader.dataFormat = URLLoaderDataFormat.BINARY;
        loader.addEventListener(SecurityErrorEvent.SECURITY_ERROR, function (e:SecurityErrorEvent):void {
            _me.onSecurityError(e, id);
        });
        loader.addEventListener(IOErrorEvent.IO_ERROR, function (e:IOErrorEvent):void {
            _me.onIOError(e, id);
        });
        loader.addEventListener(Event.COMPLETE, function (e:Event):void {
            _me.onLoadComplete(e, id);
        });
        loader.load(request);
    }

    private function onLoadComplete(e:Event, id:Number = -1):void {
        var byteArray:ByteArray = new ByteArray();
        var loader:URLLoader = e.target as URLLoader;
        loader.removeEventListener(Event.COMPLETE, this.onLoadComplete);

        byteArray.writeBytes(loader.data);
        byteArray.uncompress(CompressionAlgorithm.ZLIB);

        var movieItem:MovieEntity = new MovieEntity();
        byteArray.position = 0;
        movieItem.mergeFrom(byteArray);

        var data:Object = {};
        data.version = movieItem.version;
        data.videoSize = {
            width: movieItem[MovieEntity.PARAMS][MovieParams.VIEWBOXWIDTH],
            height: movieItem[MovieEntity.PARAMS][MovieParams.VIEWBOXHEIGHT]
        };
        data.FPS = movieItem[MovieEntity.PARAMS][MovieParams.FPS];
        data.frames = movieItem[MovieEntity.PARAMS][MovieParams.FRAMES];

        var imageDatas:Object = movieItem[MovieEntity.IMAGES];
        data.imageDatas = {};
        for (var idx:String in imageDatas) {
            var key:String = imageDatas[idx].key;
            var value:ByteArray = imageDatas[idx].value as ByteArray;
            data.imageDatas[key] = encodeBase64bytes(value, 0, value.length, false);
        }

        data.imageDatas = JSON.stringify(data.imageDatas);
        data.state = 'continue';
        data.id = id;

        if (ExternalInterface.available) {
            ExternalInterface.call('window.' + this._prefix + '.receive', data);
        }

        var _me:Parser = this;
        var spriteDatas:Array = movieItem[MovieEntity.SPRITES] as Array;
        var timer:uint = setInterval(function ():void {
            if (ExternalInterface.available) {
                ExternalInterface.call('window.' + _me._prefix + '.receive', {
                    spriteData: spriteDatas.splice(0, 15),
                    id: id,
                    state: 'continue'
                });
                if (!spriteDatas.length) {
                    clearInterval(timer);
                    ExternalInterface.call('window.' + _me._prefix + '.receive', {id: id, state: 'done'});
                }
            }
        }, 350);
    }

    private function onSecurityError(e:SecurityErrorEvent, id:Number):void {
        if (ExternalInterface.available) {
            ExternalInterface.call('window.' + this._prefix + '.error', id);
        }
    }

    private function onIOError(e:IOErrorEvent, id:Number):void {
        if (ExternalInterface.available) {
            ExternalInterface.call('window.' + this._prefix + '.error', id);
        }
    }
}
}
