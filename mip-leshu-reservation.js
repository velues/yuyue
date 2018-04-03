/**
 * @file mip-leshu-reservation 组件
 * @author
 */
define(function (require) {
    // mip 组件开发支持 zepto
    var $ = require('zepto');

    var customElement = require('customElement').create();

    /**
     * reservation逻辑层
     * @param {Obect} node 节点
     */
    var config = {url: 'http://www.diyiyou.com/'};

    /**
     * 初始化-构建初始化元素
     */
    customElement.prototype.firstInviewCallback = function () {
        $(document).ready(function () {
            if ($('.reserver').length !== 0) {
                var reserverBtn = $('.reserver');
                var reserverBox = document.createElement('div');
                reserverBox.id = 'reserverBox';
                reserverBox.className = 'reserverBox';
                reserverBox.style.display = 'none';
                var xhtml = '<div class="reserverContent"><h3>请输入预约的手机号</h3>';
                var xhtml = xhtml + '<input type="number" class="tel" placeholder="*请输入手机号码"><em></em>';
                var xhtml = xhtml + '<p>已有<span class="numRes">888</span>位玩家预约了该题材游戏</p>';
                var xhtml = xhtml + '<div class="btnbox clearfix"><span class="sendBtn">确认</span>';
                var xhtml = xhtml + '<span class="closeBtn">取消</span></div></div>';
                reserverBox.innerHTML = xhtml;
                document.body.appendChild(reserverBox);
                var dataid = reserverBtn.attr('xzid');
                var gameId = reserverBtn.attr('data-gid');
                if (gameId == null) {
                    gameId = 0;
                }
                reserverBtn.on('click', function () {
                    $('#reserverBox').css('display', 'block');
                    $('body').css('overflow', 'hidden');
                    $.ajax({
                        url: config.url + 'game/appointment.php',
                        dataType: 'jsonp',
                        data: {
                            id: dataid
                        },
                        type: 'POST',
                        success: function (data) {
                            $('.numRes').html(data);
                        }
                    });
                });
                // var closeBtn = $('.closeBtn'),
                // var sendBtn = $('.sendBtn');
                $('.closeBtn').on('click', function () {
                    $('#reserverBox').css('display', 'none');
                    $('body').css('overflow', 'scroll');
                });
                $('.sendBtn').on('click', function () {
                    var sTel = $('.tel').val();
                    var zTel = /^1[34578]\d{9}$/.test(sTel);
                    if (!zTel) {
                        $('#reserverBox').find('em').html('请填写正确的手机号！');
                    } else {
                        $.ajax({
                            url: config.url + 'game/appointment.php?m=addAppoint',
                            dataType: 'jsonp',
                            data: {
                                id: dataid,
                                gameid: gameId,
                                phone: sTel
                            },
                            type: 'post',
                            success: function (data) {
                                // console.log(data);
                                if (data === '1') {
                                    alert('预约成功');
                                    $('#reserverBox').css('display', 'none');
                                    $('body').css('overflow', 'scroll');
                                    reserverBtn.html('已预约');
                                    reserverBtn.css('background', 'rgb(254, 104, 77)');
                                    reserverBtn.off('click');
                                } else {
                                    alert('请求错误，请稍后重试！');
                                }
                            }
                        });
                    }
                });
            }
        });
    };

    return customElement;
});