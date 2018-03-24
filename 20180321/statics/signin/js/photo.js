/**
 * Created by zhonghua5 on 2017/7/18.
 */
var test;

function getParam(paramName) {
    paramValue = "";
    isFound = false;
    if (this.location.search.indexOf("?") == 0 && this.location.search.indexOf("=") > 1) {
        arrSource = unescape(this.location.search).substring(1, this.location.search.length).split("&");
        i = 0;
        while (i < arrSource.length && !isFound) {
            if (arrSource[i].indexOf("=") > 0) {
                if (arrSource[i].split("=")[0].toLowerCase() == paramName.toLowerCase()) {
                    paramValue = arrSource[i].split("=")[1];
                    isFound = true;
                }
            }
            i++;
        }
    }
    return paramValue;
}

function loadCollection() {
    document.createElement("canvas").getContext("2d");

    var m = document.createElement('div');
    m.style.cssText = "text-align:center;position: absolute;top: 50%;left:20%;width:60%;height:100px;font-size:2rem;opacity:0.6;background-color:#000;color:#fff;border-radius:5px;line-height:100px;";

    var compress = function (res, orientation) {
        var img = new Image();
        var maxPixel = 1200;
        img.onload = function () {
            var degree=0,drawWidth,drawHeight,width,height;
            drawWidth=this.naturalWidth;
            drawHeight=this.naturalHeight;
            console.log("drawWidth:"+drawWidth);
            console.log("drawHeight:"+drawHeight);
            //以下改变一下图片大小
            var maxSide = Math.max(drawWidth, drawHeight);
            if (maxSide > maxPixel) {
                var minSide = Math.min(drawWidth, drawHeight);
                minSide = minSide / maxSide * maxPixel;
                maxSide = maxPixel;
                if (drawWidth > drawHeight) {
                    drawWidth = maxSide;
                    drawHeight = minSide;
                } else {
                    drawWidth = minSide;
                    drawHeight = maxSide;
                }
            }

            var cvs=document.createElement('canvas');
            cvs.width=drawWidth;
            width=drawWidth;
            cvs.height=drawHeight;
            height=drawHeight;
            var ctx=cvs.getContext('2d');

            //判断图片方向，重置canvas大小，确定旋转角度，iphone默认的是home键在右方的横屏拍摄方式
            switch(orientation){
                // iphone横屏拍摄，此时home键在左侧
                case 3:
                    degree=180;
                    drawWidth=-width;
                    drawHeight=-height;
                    break;
                // iphone竖屏拍摄，此时home键在下方(正常拿手机的方向)
                case 6:
                    cvs.width=height;
                    cvs.height=width;
                    degree=90;
                    drawWidth=width;
                    drawHeight=-height;
                    break;
                //iphone竖屏拍摄，此时home键在上方
                case 8:
                    cvs.width=height;
                    cvs.height=width;
                    degree=270;
                    drawWidth=-width;
                    drawHeight=height;
                    break;
            }
            //使用canvas旋转校正
            ctx.rotate(degree*Math.PI/180);
            ctx.drawImage(this,0,0,drawWidth,drawHeight);

            var dataUrl = cvs.toDataURL('image/jpeg', 0.9);
            dataUrl = dataUrl.substring(dataUrl.indexOf(",")+1);
            console.log("=========dataUrl============"+dataUrl);

            $.ajax({
                type:"POST",
                url: "http://aiface.jd.com/annualMeeting/upload.action",
                dataType:"json",
                data: {
                    erp: $("#pin").val(),
                    img:dataUrl
                },
                success: function(data, textStatus, request){
                    //JSON.stringify()
                    console.log("=========faceCollection.action============"+JSON.stringify(data));
                    if(data.code==0){
                        m.innerHTML = "<div>照片上传成功</div>";
                        setTimeout(function () {
                            document.body.removeChild(m);
                            window.location.href = "/signin/confirm.html?pin="+$("#pin").val()+"&nickName="+$("#nickName").val()+"&faceUrl="+data.data.url;
                        },1000);
                    }
                    else{
                        // alert("宝宝没认出来，请试试别的东西吧");
                        m.innerHTML = "<div>识别失败，请重新拍摄</div>";
                        setTimeout(function () {
                            document.body.removeChild(m);
                        },2000);
                    }
                },
                error: function (request, textStatus, errorThrown) {
                    //document.body.removeChild(m);
                    //alert(textStatus);
                    m.innerHTML = "<div>哎呀，网络异常</div>";
                    setTimeout(function () {
                        document.body.removeChild(m);
                    },2000);
                }
            });
        };

        img.src = res;
    };
    document.getElementById('cameraInput').addEventListener('change', function() {
        if(this.files.length>0){
            var file = this.files[0];
            var orientation;
            //EXIF js 可以读取图片的元信息 https://github.com/exif-js/exif-js
            EXIF.getData(file,function(){
                orientation=EXIF.getTag(this,'Orientation');
            });
            m.innerHTML = "<div>正在识别，请稍候...</div>";
            document.body.appendChild(m);
            var reader = new FileReader();
            reader.onload = function (e) {
                compress(this.result,orientation);
            };
            reader.readAsDataURL(file);
        }

    }, false);
}

$(document).ready(function () {
    loadCollection();
});

function getPic() {
    $("#cameraInput").trigger("click");
}
