package {
import flash.display.Sprite;
import flash.events.Event;
import flash.system.Security;

[SWF(backgroundColor='0x000', width='1', height='1', frameRate='30')]
public class Main extends Sprite {
    private var _parser:Parser;

    public function Main() {
        Security.allowDomain('*');
        Security.allowInsecureDomain('*');
        this.addEventListener(Event.ADDED_TO_STAGE, this.onAddStage);
    }

    private function onAddStage(e:Event):void {
        this.removeEventListener(Event.ADDED_TO_STAGE, this.onAddStage);
        this._parser = new Parser(loaderInfo.parameters.cbname || '');
    }
}
}
