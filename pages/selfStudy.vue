<!--
 * @Author: chenjg
 * @Date: 2019-10-25 10:06:32
 * @LastEditTime: 2020-03-06 09:53:36
 * @LastEditors: xwen
 * @Description: 
 * @输出一段不带属性的自定义信息
 -->
<template>
  <div class="container">
    <v-header />
    <!-- <div class="wrap">
      <div class="welcome">
        <div class="left">
          HI，欢迎来到中医药在线医学自考专题!
        </div>
        <div class="right">
          <span class="login">我要登录</span>
          <span class="register">免费注册</span>
        </div>
      </div>
    </div> -->
    <div class="self-header">
      <img
        src="~/assets/images/logo.png"
        alt=""
        @click="toIndex">
        <!-- <div class="text">医学在线教育领先品牌</div> -->
    </div>
    <div class="main"> 
      <div class="main-wrap">
        <div class="tips">
          <span>2020年中药学</span>
          <span>药学自考</span>
        </div>
        <div class="main-pic">
          <!-- <img
            src="~/assets/images/main-pic.png"
            alt=""> -->
        </div>
        <!-- <div class="list">
          <div class="list-item">
            <img
              src="~/assets/images/item-icon1.png"
              alt="">
            <div class="title">国家认可 正规学历</div>
            <p>由教育局备案，重点大学颁发的正规证书，学信网终身可查、全国事业单位高度认可</p>
          </div>
          <div class="list-item">
            <img
              src="~/assets/images/item-icon2.png"
              alt="">
            <div class="title">高含金量  仅次统招</div>
            <p>含金量仅次与统招，医院，国企，外企均高度认可，参加公职考试，升职加薪的硬文凭</p>
          </div>
          <div class="list-item">
            <img
              src="~/assets/images/item-icon3.png"
              alt="">
            <div class="title">学费低  人人都能学</div>
            <p>单门考前辅导课程仅需180元，含名师授课视频、课后习题和模拟试卷等资料，大大降低了学习门槛</p>
          </div>
          <div class="list-item">
            <img
              src="~/assets/images/item-icon4.png"
              alt="">
            <div class="title">时间短  适合上班族</div>
            <p>江西本地最优秀的中医药大学老师+ 专业报考团队为您保驾护航，最短仅需1.5年,圆你名校本科梦</p>
          </div>
        </div> -->
      </div>
    </div>
    <div class="table-wrap">
      <div class="title">
        中药学/药学 <span>考试科目</span>一览
      </div>
      <div class="table-flex">
        <div class="table1">
          <table style="border-spacing: 2px;border-collapse: separate">
            <tbody>
              <tr>
                <th
                  class="text"
                  width="130">主考专业</th>
                <th
                  colspan="3"
                  class="text"
                  width="457">药学课程</th>
              </tr>
              <tr>
                <th
                  rowspan="6"
                  class="subject">药学</th>
                <td>病原生物学及病原生物学检验</td>
                <td>现代生物学进展</td>
                <td class="red">英语（二）</td>
              </tr>
              <tr>
                <td class="red">计算机应用基础</td>
                <td class="red">计算机应用基础（实践）</td>
                <td>有机化学（五）</td>
              </tr>
              <tr>
                <td>分子生物学</td>
                <td>物理化学（二）</td>
                <td>药理学（四）</td>
              </tr>
              <tr>
                <td>药物分析（三）</td>
                <td>药物化学（二）</td>
                <td>药剂学（二）</td>
              </tr>
              <tr>
                <td>数理统计</td>
                <td>药事管理学（二）</td>
                <td>药用植物与生药学</td>
              </tr>
              <tr>
                <td
                  class="red"
                  width="228">中国近代史纲要</td>
                <td
                  class="red"
                  width="228"
                  colspan="2">马克思主义基本原理概论</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="table2">
          <table style="border-spacing: 2px;border-collapse: separate">
            <tbody>
              <tr>
                <th
                  class="text"
                  width="130">主考专业</th>
                <th
                  colspan="3"
                  class="text"
                  width="458">中药学课程</th>
              </tr>
              <tr>
                <th
                  rowspan="4"
                  class="subject">中药学</th>
                <td>数理统计</td>
                <td>药事管理学（二）</td>
                <td>中药制药工程原理与设备</td>
              </tr>
              <tr>
                <td>药理学（四）</td>
                <td>分析化学（二）</td>
                <td>中药制剂分析</td>
              </tr>
              <tr>
                <td>病原生物学</td>
                <td>生理学</td>
                <td>无机化学</td>
              </tr>
              <tr>
                <td class="red">英语（二）</td>
                <td class="red">中国近现代史纲要</td>
                <td class="red">马克思主义基本原理概论</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="tips">
        <span>* 标红科目</span>为符合条件可进行免考
      </div>
    </div>
    <div class="section-wrap"> 
      <div class="section-content">
        <div class="section-item">
          <div class="title">
            <div class="text">免考科目</div>
          </div>
          <div class="desc">
            <p>抵免条件如下：</p>
            <p>一、00018计算机应用基础、00019计算机应用基础(实践)用全国计算 
            机等级考试—级(及以上)或全国计算机水平考试(NIT)中《计算机
            应用基础》模块证书办理抵免。 </p>
            <p>二、普通高考和成 人高考专科毕业者可免考 03708 中国近现代史纲要 
            03709 马克思主义基本原理概论。 </p>
            <p>三、凡参加全国英语等级考试(PETS)三 级及以上笔试成绩合格者或大
            学英语四、六级(省内)合格证书者可免考00015《英语(二)》</p>
          </div>
        </div>
        <div class="section-item">
          <div class="title">
            <div class="text">报考条件</div>
          </div>
          <div class="desc">
            <p>1. 中药学本科段报考对象限定为已取得卫生类职业资格的在职人员，具有中药士、药剂士及以上技术职务，或从事中药生产、经营等工作三年（含三年）以上的在职人员中的专科毕业生。</p>
            <p>2. 药学专业本科限定为具有医学类专科以上学历的在职人员或在校学生。</p>
          </div>
        </div>
        <div class="section-item">
          <div class="title">
            <div class="text">就业岗位</div>
          </div>
          <div class="desc">
            <p>自考中药学从事岗位：</p>
            <p>毕业后主要从事中药师、药剂师、验收员等工作，大致如下：</p>
            <ul>
              <li>中药师</li>
              <li>药剂师</li>
              <li>执业药师</li>
              <li style="width: 165px">质量管理师</li>
              <li style="width: 224px">验收员中药师</li>
            </ul>
          </div>
        </div>
        <div class="section-item">
          <div class="title">
            <div class="text">如何准备</div>
          </div> 
          <div class="prepare">
            <div class="text">
              <span>熟悉题型</span>
              <span>大量刷题</span>
            </div>
            <div class="sign">+</div>
            <div class="text">
              <span>掌握要点</span>
              <span>解疑解惑</span>
            </div>
            <div class="sign">=</div>
            <div class="text">
              <span>成功拿证</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="class-wrap">
      <div class="title">
        <div
          :class="['span', { 'active' : type == 1 }]"
          @click="changeType(1)">中药学</div>
        <div
          :class="['span', { 'active' : type == 2 }]"
          @click="changeType(2)">药学</div>
      </div>
      <div class="class-content">
        <table>
          <tbody>
            <tr>
              <th width="335">课程名称</th>
              <th width="170">课时</th>
              <th width="215">限时价格</th>
              <th width="202">原价</th>
              <th width="158">试听</th>
              <th width="116">咨询</th>
            </tr>
            <tr
              v-for="(item, index) in courseList" 
              :key="index">
              <td><div @click="toDetail(item.id)">{{ item.name }}</div></td>
              <td>{{ item.time }}h</td>
              <td>¥ <span>{{ item.newPrice }}</span></td>
              <td>¥ <span>{{ item.price }}</span></td>
              <td><div @click="getPlayerInfo(item.id)">免费试听</div></td>
              <td>
                <div>
                  <a
                    href="tencent://message/?uin=2111984366"
                    target="_blank">咨询</a>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- <div class="left">
          <div
            v-for="(item, index) in list"
            v-if="index < 3"
            :key="index"
            class="player-item">
            <div class="player">
              <div
                :id="'J_prismPlayer' + (index + 1)"
                class="prism-player" />
            </div>
            <div class="info">
              <div
                class="text"
                @click="toDetail(item.id)">{{ item.title }}</div>
              <div class="info-right">
                <span>共{{ item.lessonNum }}节</span>
                <span>{{ item.learnNum }}人学过</span>
              </div>
            </div>
          </div>
        </div>
        <div class="right">
          <table style="border-spacing: 2px;border-collapse: separate">
            <tbody>
              <tr>
                <th width="93">分类</th>
                <th width="202">科目名称</th>
                <th width="176">课时数</th>
                <th width="136">原价/优惠价</th>
                <th width="90">免费试听</th>
              </tr>
              <tr>
                <td
                  rowspan="8"
                  class="subject">
                  中药学
                </td>
                <td @click="toDetail(118)">数理统计</td>
                <td>共30节</td>
                <td>400/180</td>
                <td>
                  <img
                    src="../assets/images/duigou.png"
                    alt="">
                </td>
              </tr>
              <tr>
                <td @click="toDetail(114)">药事管理学（二）</td>
                <td>共29节</td>
                <td>400/180</td>
                <td>
                  <img
                    src="../assets/images/duigou.png"
                    alt="">
                </td>
              </tr>
              <tr>
                <td @click="toDetail(73)">分析化学（二）</td>
                <td>共30节</td>
                <td>400/180</td>
                <td>
                  <img
                    src="../assets/images/duigou.png"
                    alt="">
                </td>
              </tr>
              <tr>
                <td @click="toDetail(61)">中药制剂</td>
                <td>共28节</td>
                <td>400/180</td>
                <td>
                  <img
                    src="../assets/images/duigou.png"
                    alt="">
                </td>
              </tr>
              <tr>
                <td @click="toDetail(96)">中药制药工程原理与设备</td>
                <td>共29节</td>
                <td>400/180</td>
                <td>
                  <img
                    src="../assets/images/duigou.png"
                    alt="">
                </td>
              </tr>
              <tr>
                <td @click="toDetail(78)">药理学</td>
                <td>共29节</td>
                <td>400/180</td>
                <td>
                  <img
                    src="../assets/images/duigou.png"
                    alt="">
                </td>
              </tr>
              <tr>
                <td @click="toDetail(61)">中药制剂分析</td>
                <td>共28节</td>
                <td>400/180</td>
                <td>
                  <img
                    src="../assets/images/duigou.png"
                    alt="">
                </td>
              </tr>
              <tr>
                <td @click="toDetail(59)">中药炮制学</td>
                <td>共30节</td>
                <td>400/360</td>
                <td>
                  <img
                    src="../assets/images/duigou.png"
                    alt="">
                </td>
              </tr>
              <tr class="yaoxue">
                <td
                  rowspan="10"
                  class="subject"
                  style="background: #01c6ae">
                  药学 
                </td>
                <td @click="toDetail(117)">有机化学（五）</td>
                <td>共28节</td>
                <td>400/180</td>
                <td>
                  <img
                    src="../assets/images/duigou.png"
                    alt="">
                </td>
              </tr>
              <tr class="yaoxue">
                <td @click="toDetail(92)">药用植物与生物学</td>
                <td>共30节</td>
                <td>400/180</td>
                <td>
                  <img
                    src="../assets/images/duigou.png"
                    alt="">
                </td>
              </tr>
              <tr class="yaoxue">
                <td @click="toDetail(94)">药物化学（二）</td>
                <td>共31节</td>
                <td>400/180</td>
                <td>
                  <img
                    src="../assets/images/duigou.png"
                    alt="">
                </td>
              </tr>
              <tr class="yaoxue">
                <td @click="toDetail(118)">数理统计</td>
                <td>共30节</td>
                <td>400/180</td>
                <td>
                  <img
                    src="../assets/images/duigou.png"
                    alt="">
                </td>
              </tr>
              <tr class="yaoxue">
                <td @click="toDetail(114)">药事管理学（二）</td>
                <td>共29节</td>
                <td>400/180</td>
                <td>
                  <img
                    src="../assets/images/duigou.png"
                    alt="">
                </td>
              </tr>
              <tr class="yaoxue">
                <td @click="toDetail(116)">分子生物学</td>
                <td>共30节</td>
                <td>400/180</td>
                <td>
                  <img
                    src="../assets/images/duigou.png"
                    alt="">
                </td>
              </tr>
              <tr class="yaoxue">
                <td @click="toDetail(115)">物理化学</td>
                <td>共30节</td>
                <td>400/180</td>
                <td>
                  <img
                    src="../assets/images/duigou.png"
                    alt="">
                </td>
              </tr>
              <tr class="yaoxue">
                <td @click="toDetail(95)">药物分析</td>
                <td>共30节</td>
                <td>400/180</td>
                <td>
                  <img
                    src="../assets/images/duigou.png"
                    alt="">
                </td>
              </tr>
              <tr class="yaoxue">
                <td @click="toDetail(93)">药剂学</td>
                <td>共30节</td>
                <td>400/180</td>
                <td>
                  <img
                    src="../assets/images/duigou.png"
                    alt="">
                </td>
              </tr>
              <tr class="yaoxue">
                <td @click="toDetail(78)">药理学</td>
                <td>共29节</td>
                <td>400/180</td>
                <td>
                  <img
                    src="../assets/images/duigou.png"
                    alt="">
                </td>
              </tr>
            </tbody>
          </table>
          <div
            class="more"
            @click="toMore">更多视频 >></div>
        </div> -->
      </div>
    </div>
    <div class="selfStudy-wrap">
      <div class="title">
        自考好课 提分<span>“课”</span>不容缓
      </div>
      <div class="selfStudy-content">
        <div class="left">
          <div class="con">
            <span/>
            知识点层层打通
          </div>
          <div class="con">
            <span/>
            高效备考无压力
          </div>
          <p>考前课程咨询</p>
          <p>19100170509</p>
          <p class="text">刘老师（电话/微信号）</p>
        </div>
        <div class="right">
          <div
            style="width: 190px"
            class="ord">
            <div class="name">适合考生:</div>
            <p>基础薄弱</p>
            <p>+</p>
            <p>复习效率低</p>
            <p>+</p>
            <p>备考时间有限</p>
            <p>+</p>
            <p>缺乏专业指导</p>
          </div>
          <div
            style="width: 247px"
            class="two">
            <div class="name">课程特点:</div>
            <p><span>基础梳理精讲：</span>江西中医药大
            学资深教授，数十年教龄</p>
            <p><span>考点串讲分析：</span>主考院校命题
            评测，掌握考试得分重点</p>
            <p><span>题库密集刷题：</span>刷爆真题，抢
            分逆袭</p>
          </div>
          <div
            style="width: 222px"
            class="ord">
            <div class="name">配套资料:</div>
            <p>
              <img src="../assets/images/self_01.png">
              《报考指南》
            </p>
            <p>
              <img src="../assets/images/self_01.png">
              《参考书目》
            </p>
            <p>
              <img src="../assets/images/self_01.png">
              《优化训练题库》
            </p>
            <p>
              <img src="../assets/images/self_01.png">
              《模拟试卷》
            </p>
          </div>
          <div
            style="width: 187px"
            class="two">
            <div class="name">专项服务:</div>
            <p>
              <img src="../assets/images/self_01.png">
              报考提醒
            </p>
            <p>
              <img src="../assets/images/self_01.png">
              成绩查询提醒
            </p>
            <p>
              <img src="../assets/images/self_01.png">
              班主任跟踪学习
            </p>
            <p>
              <img src="../assets/images/self_01.png">
              定期模考
            </p>
            <p>
              <img src="../assets/images/self_01.png">
              考不过重读
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="teacher-wrap">
      <div class="title">
        名师教学团队 <span>备考无忧</span>
      </div>
      <div class="teacher-content">
        <div class="teacher-list swiper-container">
          <div class="swiper-wrapper">
            <div class="teacher-item swiper-slide">
              <div class="head">
                <img src="../assets/images/self_header.png">
                <p class="name">余老师</p>
              </div>
              <div class="desc">教授、副教授，主讲《生物化学》《分子生物学》</div>
            </div>
            <div class="teacher-item swiper-slide">
              <div class="head">
                <img src="../assets/images/self_header.png">
                <p class="name">俞老师</p>
              </div>
              <div class="desc">
                教授，硕士生导师，国家执业药师，CFDA国家执业药师工作专家，国家执业药师《药事管理与法规》师资，主讲《药事管理学》、《药事管理与法规》</div>
            </div>
            <div class="teacher-item swiper-slide">
              <div class="head">
                <img src="../assets/images/self_header.png">
                <p class="name">傅老师</p>
              </div>
              <div class="desc">主管中药师，多年一线教学经验。主讲《药剂学》《中药药剂学》</div>
            </div>
          </div>
        </div>
        <div class="swiper-button-prev swiper-button" />
        <div class="swiper-button-next swiper-button" />
      </div>
    </div>
    <div class="xlts-wrap">
      <div class="title">
        2020年<span>学历提升</span>为什么选择自考？
      </div>
      <div class="xlts-content">
        <div class="list-item">
          <img
            src="../assets/images/tab1.png" 
            alt="">
          <div class="con">
            <div class="name">国家认可的正规学历</div>
            <p>由省高等教育自学考试委员会和主考院校大学颁发的正规证书，学信网终身可查</p>
          </div>
        </div>
        <div class="list-item">
          <img
            style="width: 135px; height: 129px"
            src="../assets/images/tab2.png" 
            alt="">
          <div class="con">
            <div class="name">高含金量，仅次统招</div>
            <p>含金量仅次与统招，国企、外企和医院等单位均高度认可，参加公职考试，升职加薪的硬文凭</p>
          </div>
        </div>
        <div class="list-item">
          <img
            src="../assets/images/tab3.png" 
            alt="">
          <div class="con">
            <div class="name">学费低，人人可学</div>
            <p>全科考试不足3000元，单门考前辅导课程仅需180元，含名师授课视频、课后习题和模拟试卷等资料</p>
          </div>
        </div>
        <div class="list-item">
          <img
            style="width: 135px; height: 126px"
            src="../assets/images/tab4.png" 
            alt="">
          <div class="con">
            <div class="name">时间短，适合上班族</div>
            <p>名师授课专业报考辅导，最短仅需2年,圆你名校本科梦</p>
          </div>
        </div>
      </div>
    </div>
    <div class="sb-wrap">
      <div class="title">
        <span>支持多终端</span> 听课更方便
      </div>
      <div class="sb-content">
        <div class="text">支持电脑和手机等多平台学习
        可离线缓存，随时学，反复听
        碎片化时间，学习高效方便</div>
        <img src="../assets/images/sb.png">
      </div>
    </div>
    <div class="question-wrap">
      <div class="question-content">
        <div class="wrap-1200">
          <!-- <div class="text">自考专题所有课程均由江西中医药大学名师录制，质量可信赖，适用于江西省本地所有中药学/药学自考考生</div> -->
          <div class="title">
            <span style="color: #01c6ae">精品</span>课程
            <span style="color: #ff8a4b">海量</span>刷题
          </div>
          <div class="desc">
            考生根据自身复习水平，可自由选择课程进行购买
          </div>
          <div class="item">
            <span class="mes">名师讲解专业辅导课程</span>
            <span class="add"> + </span>
            <span class="mes">考前抢分试卷</span>
            <span class="add"> + </span>
            <span class="mes">海量题库练习</span>
          </div>
          <div class="price">仅需要<span>180</span>元/门</div>
          <div class="tip">祝愿每位考生都能考试顺顺利利，一次过关！</div>
          <div class="concat">考前课程咨询  电话/微信号：19100170509 刘老师</div>
        </div>
      </div>
    </div>
    <div class="foot-wrap">
      <div class="foot-content">
        <div class="title">国家教育部认可，学信网可查</div>
        <div class="subtitle">登录教育考试学院学历查询系统”学信网”（
          <a href="http://www.chsi.com.cn/">http://www.chsi.com.cn/</a>
          ）终身可查
        </div>
        <div class="content">
          <p>1. 所有学员成绩合格者可获取所报考院校专业对应的学历证书，该证书属于国民教育系列学历证书，国家承认，社会认可。</p>
          <p>2. 电子注册，唯一编码，学信网终身可查。</p>
          <p>3. 含金量高，待遇等同在校统招生，企事业单位认可度高，可申请优先办理居住证</p>
          <div
            class="button"
            @click="showModal">本科证书咨询</div>
        </div>
      </div>
    </div>
    <div class="zx-wrap">
      <div class="zx-content">
        <img
          class="yisheng"
          src="../assets/images/yisheng.png">
        <div class="text">一对一报考咨询解你所惑</div>
        <div class="qrcodes">
          <div class="qrcode">
            <img src="../assets/images/self_wx.png">
            <p>微信扫码咨询</p>
          </div>
          <div class="qrcode">
            <img src="../assets/images/self_qq.png">
            <p>QQ扫码咨询</p>
          </div>
        </div>
      </div>
    </div>
    <div class="fotter">
      <p>课程购买咨询：0791-87119966 平台（渠道）合作：0791-88197248 </p>  
      <p class="pl">版权所有：Copyright 2018-{{ year }} zyyzx.com.cn. All Rights Reserved</p>
      <p class="pl">备案号：<a href="http://beian.miit.gov.cn/">赣ICP备15008425号</a><a 
        href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=36011102000325" 
        target="_blank"><img src="../assets/images/zgwablogo.png" >赣公网安备：36011102000325号</a></p>
      <p class="pl">技术支持：<a href="http://www.yunduancn.com/">云端科技</a></p>
    </div>
    <div
      v-if="advertisingShow"
      class="advertising">
      <div class="advertising-content">
        <div class="gift">
          <img src="../assets/images/gift.png">
          <p>您有一份好礼</p>
        </div>
        <div class="form">
          <p>输入手机号，免费领取2020自考学习资料</p>
          <div class="form-item">
            <input
              v-model="phone"
              class="phone"
              placeholder="输入手机号"
              type="text">
            <div class="code-item">
              <input
                v-model="code"
                class="code"
                placeholder="手机验证码"
                type="text">
              <div
                v-if="!timeShow"
                class="code-btn"
                @click="getCode">获取验证码</div>
              <div
                v-else
                class="code-btn">{{ count }}s后重试</div>
            </div>
            <div
              class="submit"
              @click="confirm">免费领取</div>
          </div>
          <div class="agreement">
            <label>
              <input
                v-model="checkbox"
                :checked="checkbox"
                type="checkbox"
                class="checkbox">
              <div class="show-box" />
            </label>
            <p>
              我已阅读并接受
              <span @click="clickDealModal(0)">《中医药在线注册条款》</span>
              和
              <span @click="clickDealModal(1)">《隐私权保护政策》</span>
            </p>
          </div>
        </div>
      </div>
      <div
        class="advertising-close"
        @click="advertisingShow = false">
        <i class="el-icon-close" />
      </div>
    </div>
    <!-- 视频弹窗 -->
    <video-modal
      v-show="showVideoModal"
      :user-info="userInfo"
      :data="videoInfo"
      @hide-modal="hideModal" />
    <!-- 协议 -->
    <deal-modal
      :show-modal="dealShowModal"
      :deal-type="dealType"
      @agree="agree"
      @hide-modal="dealHideModal" />
  </div>
</template>
<script>
import Cookies from 'js-cookie'
import Header from '../components/layout/selfHeader.vue'
import VideoModal from '../components/modal/videoModal.vue'
import DealModal from '../components/modal/dealModal.vue'
import Swiper from 'swiper'
import 'swiper/css/swiper.css'
export default {
  layout: 'emty',
  components: {
    "v-header": Header,
    'video-modal': VideoModal,
    'deal-modal': DealModal
  },
  data() {
    return {
      userInfo: {},
      player: null,
      dealShowModal: false,
      dealType: 0,  // 1：注册条款  0： 隐私保护
      advertisingShow: true,
      list: [],
      token: '',
      phone: '',
      code: '',
      timeShow: false,
      timer: null,
      count: '',
      checkbox: false,
      videoInfo: {},
      showVideoModal: false,
      type: 1, // 1: 中药  2：西药
      courseList: [],
      chinaList: [{
        id: 118,
        name: '数理统计',
        time: 30,
        price: 400,
        newPrice: 180
      }, {
        id: 114,
        name: '药事管理学（二）',
        time: 29,
        price: 400,
        newPrice: 180
      }, {
        id: 73,
        name: '分析化学（二）',
        time: 30,
        price: 400,
        newPrice: 180
      }, {
        id: 61,
        name: '中药制剂',
        time: 28,
        price: 400,
        newPrice: 180
      }, {
        id: 96,
        name: '中药制药工程原理与设备',
        time: 29,
        price: 400,
        newPrice: 180
      }, {
        id: 175,
        name: '药理学',
        time: 0,
        price: 400,
        newPrice: 180
      }, {
        id: 61,
        name: '中药制剂分析',
        time: 28,
        price: 400,
        newPrice: 180
      }, {
        id: 59,
        name: '中药炮制学',
        time: 30,
        price: 400,
        newPrice: 180
      }],
      westernList: [{
        id: 117,
        name: '有机化学（五）',
        time: 28,
        price: 400,
        newPrice: 180
      }, {
        id: 92,
        name: '药用植物学与生物学',
        time: 31,
        price: 400,
        newPrice: 180
      }, {
        id: 94,
        name: '药物化学（二）',
        time: 30,
        price: 400,
        newPrice: 180
      }, {
        id: 118,
        name: '数理统计',
        time: 30,
        price: 400,
        newPrice: 180
      }, {
        id: 114,
        name: '药事管理学（二）',
        time: 29,
        price: 400,
        newPrice: 180
      }, {
        id: 116,
        name: '分子生物学',
        time: 30,
        price: 400,
        newPrice: 180
      }, {
        id: 115,
        name: '物理化学',
        time: 30,
        price: 400,
        newPrice: 180
      }, {
        id: 95,
        name: '药物分析',
        time: 30,
        price: 400,
        newPrice: 180
      }, {
        id: 93,
        name: '药剂学',
        time: 33,
        price: 400,
        newPrice: 180
      }],
      myDate: null,
      year: null
    }
  },
  head() {
    return {
      link: [
        { rel: 'stylesheet', href: 'https://g.alicdn.com/de/prismplayer/2.8.7/skins/default/aliplayer-min.css' }
      ],
      script: [
        { src: 'https://g.alicdn.com/de/prismplayer/2.8.7/aliplayer-min.js', type: 'text/javascript'}      
      ]
    }
  },
  mounted() {
    this.userInfo = Cookies.getJSON('zyy_userInfo')
    this.login()
    this.getYear()
    // this.getList()
    this.courseList = this.chinaList
    new Swiper('.swiper-container', {
      loop: true,
      slidesPerView: 3,
      spaceBetween: 33,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }
    })
  },
  methods: {
    getYear() {
      this.myDate = new Date()
      this.year = this.myDate.getFullYear()
    },
    clickDealModal(type) {
      console.log('type', type)
      this.dealType = type
      this.dealShowModal = true
    },
    agree () {
      this.dealShowModal = false
      this.checkbox = true
    },
    dealHideModal() {
      this.dealShowModal = false
    },
    hideModal() {
      this.showVideoModal = false
      this.player.dispose()
    },
    changeType (type) {
      if (type == 1) {
        this.type = 1
        this.courseList = this.chinaList
      } else {
        this.type = 2
        this.courseList = this.westernList
      }
    },
    getCode() {
      if (!this.phone) {
        this.$message({
          message: '请输入手机号',
          type: 'warning'
        })
      } else {
        this.$message({
          message: '已发送验证码，请查收!',
          type: 'success'
        })
        const TIME_COUNT = 60
        if (!this.timer) {
          this.count = TIME_COUNT
          this.timeShow = true
          this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= TIME_COUNT) {
              this.count--
            } else {
              this.timeShow = false
              clearInterval(this.timer)
              this.timer = null
            }
          }, 1000)
        }
      }
    },
    confirm() {
      if (!this.phone) {
        this.$message({
          message: '请输入手机号',
          type: 'warning'
        })
        return
      }
      if (!this.code) {
        this.$message({
          message: '请输入验证码',
          type: 'warning'
        })
        return
      }
      if (!this.checkbox) {
        this.$message({
          message: '请阅读并接受相关注册条款和隐私权保护政策',
          type: 'warning'
        })
        return
      }
      this.$message({
        message: '领取成功，请耐心等待客服与您联系！',
        type: 'success'
      })
    },
    getList() {
       this.$axios('/yxs/api/web/course/getRecommendList', {
        params: {
          type: 'education'
        }
      }).then(res => {
        this.list = res.data
        console.log(this.list)
        for(let i = 0; i < this.list.length; i ++) {
          if(i > 2 || this.list.length == 0) {
            break;
          }
          this.getPlayerInfo(this.list[i].id, i + 1)
        }
      })
    },
    getPlayerInfo(id) {
      this.showVideoModal = true
      this.$axios.post('/yxs/api/web/user/startLearnCourse', {
        courseId: id,
        userToken: this.token
      }).then(res => {
        let info = res.data
        this.videoInfo = res.data
        this.createPlayer(info)
      })
    },
    createPlayer(info) {
      this.player = new Aliplayer({
        "id": "J_prismPlayer",
        "vid": info.videoId,
        "playauth": info.playAuth,
        "qualitySort": "asc",
        "format": "m3u8",
        "mediaType": "video",
        "width": "100%",
        "height": "460px",
        "autoplay": true,
        "isLive": false,
        "cover": info.cover,
        "rePlay": false,
        "playsinline": true,
        "preload": true,
        "controlBarVisibility": "hover",
        "useH5Prism": true,
        "encryptType": 1
      }, function (player) {
        console.log("播放器创建了。");
      })
    },
    // 登录
    login() {
      this.$axios.post('/admin/api/web/account/login', {
        type: 'PWD',
        userName: 'may001',
        password: '123456'
      }).then(res => {
        if(res.code == 0) {
          this.token = res.data.userToken
          // this.getList()
        }
      })
    },
    toDetail(id) {
      let url = this.$router.resolve({
        name: 'lessonDetail',
        query: {
          id
        }
      })
      window.open(url.href, '_blank')
    },
    showModal() {
      this.$alert('<div style="text-align: center">证书咨询请拨打下方联系电话</div><div style="text-align: center">郭老师18160712043</div>', '温馨提示', {
        dangerouslyUseHTMLString: true,
        confirmButtonText: '我知道啦'
      });
    },
    toMore() {
      let url = this.$router.resolve({
        name: 'train',
        query: {
          fid: 107,
          cid: 53
        }
      })
      window.open(url.href, '_blank')
    },
    toIndex() {
      let url = this.$router.resolve({
        name: 'index'
      })
      window.open(url.href, '_blank')
    }
  }
}
</script>
<style lang="scss" scoped>
  .container {
    background: #fff;
  }
  .wrap {
    width: 100%;
    height: 40px;
    background: #f5f5f5;
    line-height: 40px;
  }
  .welcome {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    .left {
      font-size: 14px;
      color: #888;
    }
    .right {
      font-size: 14px;
      .login {
        color: #888;
        margin-right: 20px;
      }
      .register {
        color: #ff9257;
      }
    }
  }
  .self-header {
    width: 1200px;
    height: 80px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: 80px;
    img {
      height: 80px;
      cursor: pointer;
    }
    .text {
      color: #666;
      font-size: 20px;
    }
  }
  .main {
    position: relative;
    width: 100%;
    height: 556px;
    background: url('../assets/images/self-banner.jpg') top center no-repeat;
    &-wrap {
      width: 1200px;
      margin: 0 auto;
      .tips {
        width: 148px;
        height: 64px;
        padding: 6px 0;
        background: #ff8a4b;
        text-align: center;
        border-radius: 0 0 30px 30px;
        span {
          display: block;
          line-height: 32px;
          font-size: 16px;
          color: #fff;
        }
      }
      .main-pic {
        margin-top: 40px;
        margin-left: 90px;
      }
      .list {
        position: absolute;
        bottom: -108px;
        display: flex;
        text-align: center;
        &-item {
          width: 285px;
          height: 368px;
          margin-left: 20px;
          padding: 0 48px;
          box-sizing: border-box;
          background: #fff;
          box-shadow: 0px 0px 15px 0px 
      rgba(0, 0, 0, 0.1);
          font-family: 'MicrosoftYaHei,Source Sans Pro,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif';
          border-radius: 6px;
          text-align: center;
          &:first-child {
            margin-left: 0;
          }
          img {
            width: 86px;
            height: 86px;
            margin-top: 40px;
          }
          .title {
            display: flex;
            justify-content: space-between;
            width: 188px;
            margin-top: 40px;
            font-size: 20px;
            color: #333;
            letter-spacing: 2px;
          }
          p {
            width: 190px;
            margin-top: 20px;
            line-height: 26px;
            font-size: 16px;
            color: #999;
            text-align: left;
            font-family: 'MicrosoftYaHei,Source Sans Pro,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif';
            font-weight: normal;
	          font-stretch: normal;
            letter-spacing: 2px;
          }
        }
      }
    }
  }
  .table-wrap {
    position: relative;
    width: 1270px;
    height: 721px;
    margin: -82px auto;
    background: #fff;
    box-sizing: border-box;
    padding: 70px 35px 35px;
    box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.1);
    border-radius: 6px;
    .title {
      position: relative;
      padding-bottom: 30px;
      font-size: 52px;
      font-family: 'MicrosoftYaHei,Source Sans Pro,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif';
      font-weight: 700;
      color: #333;
      text-align: center;
      border-bottom: 1px solid #ddd;
      &::after {
        position: absolute;
        content: '';
        bottom: 0;
        left: 50%;
        margin-left: -150px;
        width: 300px;
        height: 8px;
        background: #01c6ae;
      }
      span {
        color: #ff8a4b;
      }
    }
    .table-flex {
      margin-top: 58px;
      display: flex;
      justify-content: space-between;
      .table1, .table2 {
        width: 587px;
        height: 420px;
        td {
          width: 130px;
          vertical-align: middle;
          padding: 0 20px;
          text-align: center;
          box-sizing: border-box;
          font-size: 14px;
          line-height: 20px;
          background: #f5f5f5;
        }
        .subject {
          width: 130px;
          height: 370px;
          vertical-align: middle;
          font-size: 20px;
          color: #fff;
          font-weight: 500;
          background: url('../assets/images/subject-bg.jpg') no-repeat;
          background-size: 100% 100%;
        }
        .red {
          font-size: 14px;
          color: #e60012;
        }
      }
      .table1 {
        td {
          height: 60px;
        }
      }
      .table2 {
        td {
          height: 90px;
        }
      }
      .text {
        height: 50px;
        line-height: 50px;
        background: #01c6ae;
        font-size: 20px;
        color: #fff;
        font-weight: 500;
      }
    }
    .tips {
      text-align: center;
      margin-top: 35px;
      color: #333;
      font-size: 16px;
      span {
        color: #e60012;
      }
    }
  }
  .section-wrap {
    position: relative;
    top: 120px;
    width: 100%;
    height: 806px;
    background: url('../assets/images/section-bg.jpg') no-repeat;
    .section-content {
      width: 1200px;
      margin: 0 auto;
      box-sizing: border-box;
      font-size: 0;
    }
    .section-item {
      float: left;
      width: 590px;
      height: 330px;
      margin-top: 45px;
      // background: #fff;
      &:nth-child(2n) {
        margin-left: 20px;
      }
      &:nth-child(2), &:nth-child(3) {
        .title {
          border-bottom: 65px solid #01c6ae;
          &::before {
            position: absolute;
            content: '';
            top: 15px;
            right: -50px;
            width: 10px;
            height: 50px;
            background: #ff8a4b;
            transform: skew(45deg);
          }
        }
      }
      .title {
        position: relative;
        height: 0;
        width: 313px;
        border-bottom: 65px solid #ff8a4b;
        border-right: 65px solid transparent;
        &::before {
          position: absolute;
          content: '';
          top: 15px;
          right: -50px;
          width: 10px;
          height: 50px;
          background: #01c6ae;
          transform: skew(45deg);
        }
        .text {
          line-height: 65px;
          margin-left: 30px;
          font-size: 24px;
          color: #fff;
          font-weight: 700;
        }
      }
      .desc, .prepare {
        width: 590px;
        height: 266px;
        padding: 20px;
        box-sizing: border-box;
        background: #fff;
        font-size: 16px;
        line-height: 28px;
        color: #666;
        li {
          float: left;
          width: 123px;
          height: 46px;
          line-height: 46px;
          border: 1px solid #ffb085;
          box-sizing: border-box;
          // padding: 0 35px;
          text-align: center;
          font-size: 16px;
          margin-right: 20px;
          margin-top: 20px;
        }
      }
      .prepare {
        display: flex;
        align-items: center;
        padding: 0 30px;
        .text {
          span {
            display: block;
            width: 152px;
            height: 46px;
            line-height: 46px;
            text-align: center;
            box-sizing: border-box;
            border: 1px solid #01c6ae;
            &:nth-child(2) {
              margin-top: 30px;
            }
          }
        }
        .sign {
          margin: 0 10px;
          color: #ffb085;
          font-size: 30px;
          font-weight: 700;
        }
      }
    }
  }
  .class-wrap {
    padding: 90px 0;
    position: relative;
    top: 90px;
    .title {
      width: 1200px;
      height: 88px;
      line-height: 88px;
      margin: 0 auto;
      font-size: 30px;
      color: #fff;
      background: #01c6ae;
      display: flex;
      .span {
        width: 300px;
        text-align: center;
        background: #00b7a1;
        cursor: pointer;
        &.active {
          background: #ff8a4b;
        }
      }
    }
    .class-content {
      display: flex;
      width: 1200px;
      margin: 40px auto 0;
      .left {
        margin-top: 2px;
        width: 475px;
      }
      .player-item {
        width: 475px;
        .player {
          width: 100%;
          height: 274px;
          background: #ccc;
        }
        .info {
          display: flex;
          justify-content: space-between;
          margin-top: 20px;
          margin-bottom: 25px;
          height: 40px;
          line-height: 40px;
          background: #e8f8f6;
          .text {
            margin-left: 30px;
            font-size: 18px;
            color: #7f8584;
            cursor: pointer;
          }
          .info-right {
            // margin-right: 30px;
            span {
              display: inline-block;
              margin-right: 30px;
              font-size: 14px;
              color: #999;
            }
          }
        }
      }
      .right {
        margin-left: 17px;
        width: 705px;
      }
      table {
        width: 1200px;
        th {
          background: #e8f8f6;
          color: #666;
          font-size: 20px;
          font-weight: normal;
          height: 85px;
          line-height: 85px;
          &:first-child {
            box-sizing: border-box;
            padding-left: 40px;
            text-align: left;
          }
        }
        td {
          height: 85px;
          line-height: 85px;
          font-size: 20px;
          font-weight: normal;
          color: #666;
          text-align: center;
          cursor: pointer;
          box-sizing: border-box;
          border-bottom: 1px solid #ccc;
          &:first-child {
            box-sizing: border-box;
            padding-left: 40px;
            text-align: left;
            color: #01c6ae;
          }
          &:nth-child(3) {
            color: #ff8a4b;
            span {
              font-size: 28px;
            }
          }
          &:nth-child(4) {
            span {
              font-size: 28px;
            }
          }
          &:nth-child(5) {
            div {
              width: 123px;
              height: 40px;
              line-height: 40px;
              display: inline-block;
              vertical-align: middle;
              background-color: #01c6ae;
              border-radius: 20px;
              color: #fff;
            }
          }
          &:nth-child(6) {
            div {
              width: 80px;
	            height: 40px;
              line-height: 40px;
              display: inline-block;
              vertical-align: middle;
	            background-color: #f6cc8d;
	            border-radius: 20px;
              a {
                font-size: 20px;
                color: #666;
              }
            }
          }
        }
        .subject {
          // height: 414px;
          background: #ff8a4b;
          vertical-align: middle;
          font-size: 18px;
          color: #fff;
        }
      }
      .yaoxue {
        td {
          height: 47px;
          line-height: 47px;
          background: #e8f8f6;
        }
      }
      .more {
        width: 100%;
        height: 70px;
        margin-top: 24px; 
        line-height: 70px;
        font-size: 22px;
        background: #f9f1ed;
        text-align: center;
        color: #f4691d;
        cursor: pointer;
      }
    }
  }
  .selfStudy-wrap {
    margin: 114px auto 0;
    .title {
      width: 1200px;
      margin: 0 auto;
      position: relative;
      padding-bottom: 30px;
      font-size: 52px;
      font-family: 'MicrosoftYaHei,Source Sans Pro,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif';
      font-weight: 700;
      color: #333;
      text-align: center;
      border-bottom: 1px solid #ddd;
      &::after {
        position: absolute;
        content: '';
        bottom: 0;
        left: 50%;
        margin-left: -150px;
        width: 300px;
        height: 8px;
        background: #01c6ae;
      }
      span {
        color: #ff8a4b;
      }
    }
    .selfStudy-content {
      width: 1200px;
      height: 332px;
      margin: 40px auto 0;
      display: flex;
      .left {
        width: 355px;
        height: 100%;
        background: #01c6ae;
        box-sizing: border-box;
        border-bottom: 3px solid #ff8a4b;
        padding: 45px 45px 25px;
        .con {
          width: 265px;
	        height: 58px;
          line-height: 58px;
          margin-bottom: 20px;
	        background-color: #078768;
	        border-radius: 20px 0px 20px 0px;
          font-size: 24px;
	        font-weight: normal;
          color: #fff;
          span {
            width: 14px;
	          height: 14px;
            display: inline-block;
            margin: 0 22px 0 19px;
            border-radius: 7px;
	          background-color: #2fc8a2;
          	box-shadow: inset 0px 5px 6px 0px rgba(6, 0, 1, 0.35);
	          border: solid 2px #2fc8a2;
          }
        }
        p {
          font-size: 24px;
          color: #fff;
          margin-bottom: 19px;
          &.text {
            font-size: 16px;
          }
        }
      }
      .right {
        flex: 1;
        display: flex;
        >div {
          box-sizing: border-box;
          padding: 32px 16px 0 24px;
          &.two {
            background: #e8f8f6;
            >p {
              img {
                margin-right: 10px;
              }
            }
          }
          &.ord {
            &:first-child {
              .name {
                margin-bottom: 36px;
              }
              p {
                line-height: 24px;
              }
            }
          }
          .name {
            font-family: 'MicrosoftYaHei,Source Sans Pro,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif';
            font-size: 26px;
            font-weight: 600;
            color: #333;
            margin-bottom: 30px;
          }
          >p {
            font-size: 16px;
            color: #666;
            line-height: 36px;
            img {
              width: 15px;
              height: 15px;
              vertical-align: middle;
            }
            span {
              color: #01c6ae;
            }
          }
        }
      }
    }
  }
  .teacher-wrap {
    margin: 80px auto 0;
    .title {
      width: 1200px;
      margin: 0 auto;
      position: relative;
      padding-bottom: 30px;
      font-size: 52px;
      font-family: 'MicrosoftYaHei,Source Sans Pro,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif';
      font-weight: 700;
      color: #333;
      text-align: center;
      border-bottom: 1px solid #ddd;
      &::after {
        position: absolute;
        content: '';
        bottom: 0;
        left: 50%;
        margin-left: -150px;
        width: 300px;
        height: 8px;
        background: #01c6ae;
      }
      span {
        color: #ff8a4b;
      }
    }
    .teacher-content {
      width: 1200px;
      height: 210px;
      margin: 37px auto 0;
      position: relative;
      .teacher-list {
        box-sizing: border-box;
        padding: 13px;
        .teacher-item {
          width: 378px;
	        height: 207px;
	        background: #fff;
          box-sizing: border-box;
          padding: 28px 17px 28px 35px;
          border-radius: 10px;
          box-shadow: 0px 0px 13px 0px rgba(1, 198, 174, 0.3);
          .head {
            width: 100%;
            height: 48px;
            display: flex;
            align-items: center;
            img {
              width: 48px;
              height: 48px;
            }
            p.name {
              margin-left: 15px;
              font-size: 20px;
              line-height: 34px;
	            letter-spacing: -1px;
              font-weight: 600;
              color: #01c6ae;
            }
          }
          .desc {
            margin-top: 15px;
            font-size: 14px;
            line-height: 28px;
            letter-spacing: 0px;
            color: #666;
          }
        }
      }
      .swiper-button {
        width: 50px;
        height: 50px;
        box-sizing: border-box;
        position: absolute;
        top: 93px;
        border-radius: 25px;
        border: 4px solid #01c6ae;
        color: #01c6ae;
        &:after {
          font-size: 20px;
          font-weight: 600;
        }
        &-prev {
          left: -60px;
        }
        &-next {
          right: -60px; 
        }
      }
    }
  }
  .xlts-wrap {
    margin: 90px auto 0;
    .title {
      width: 1200px;
      margin: 0 auto;
      position: relative;
      padding-bottom: 30px;
      font-size: 52px;
      font-family: 'MicrosoftYaHei,Source Sans Pro,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif';
      font-weight: 700;
      color: #333;
      text-align: center;
      border-bottom: 1px solid #ddd;
      &::after {
        position: absolute;
        content: '';
        bottom: 0;
        left: 50%;
        margin-left: -150px;
        width: 300px;
        height: 8px;
        background: #01c6ae;
      }
      span {
        color: #ff8a4b;
      }
    }
    .xlts-content {
      width: 1200px;
      margin: 60px auto 0;
      display: flex;
      flex-wrap: wrap;
      .list-item {
        width: 588px;
        height: 203px;
        margin-top: 24px;
        background: #fff;
        box-shadow: 0px 2px 26px 0px rgba(1, 198, 174, 0.15);
	      border-radius: 10px;
        box-sizing: border-box;
        padding: 38px 40px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        &:nth-child(2n) {
          margin-left: 24px;
        }
        img {
          width: 112px;
          height: 129px;
          margin-right: 40px;
        }
        .con {
          flex: 1;
          .name {
            line-height: 26px;
            font-size: 24px;
            color: #333;
          }
          p {
            margin-top: 30px;
            line-height: 26px;
            font-size: 16px;
            color: #666;
          }
        }
      }
    }
  }
  .sb-wrap {
    width: 100%;
    height: 800px;
    margin-top: 90px;
    box-sizing: border-box;
    padding-top: 70px;
    background: url('../assets/images/sb-bg.jpg') no-repeat top;
    .title {
      width: 1200px;
      margin: 0 auto;
      position: relative;
      padding-bottom: 30px;
      font-size: 52px;
      font-family: 'MicrosoftYaHei,Source Sans Pro,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif';
      font-weight: 700;
      color: #fff;
      text-align: center;
      border-bottom: 1px solid #fff;
      &::after {
        position: absolute;
        content: '';
        bottom: 0;
        left: 50%;
        margin-left: -150px;
        width: 300px;
        height: 8px;
        background: #fff;
      }
      span {
        color: #ff8a4b;
      }
    }
    .sb-content {
      width: 1200px;
      margin: 60px auto 0;
      position: relative;
      height: 500px;
      .text {
        width: 403px;
        position: absolute;
        top: 58px;
        left:  39px;
        font-size: 28px;
        font-weight: normal;
        letter-spacing: 1px;
        font-family: "MicrosoftYaHei";
        color: #fff;
        line-height: 48px;
      }
      >img {
        width: 790px;
        height: 545px;
        position: absolute;
        top: 0;
        right: 0;
      }
    }
  }
  .question-wrap {
    width: 100%;
    height: 740px;
    background: url('../assets/images/question-bg.png') no-repeat;
    .question-content {
      width: 100%;
      height: 740px;
      background: rgba(44, 44, 44, .7);
    }
    .wrap-1200 {
      width: 1200px;
      margin: 0 auto;
      padding-top: 70px;
      .text {
        font-size: 18px;
        color: #fff;
        text-align: center;
      }
      .title {
        position: relative;
        padding-bottom: 40px;
        font-size: 70px;
        font-weight: 700;
        border-bottom: 1px solid #ddd;
        color: #fff;
        text-align: center;
        &::after {
          position: absolute;
          content: '';
          left: 50%;
          bottom: 0;
          width: 300px;
          height: 8px;
          margin-left: -150px;
          background: #01c6ae;
        }
      }
      .desc {
        margin-top: 30px;
        text-align: center;
        font-size: 30px;
        color: #fff;
      }
      .item {
        margin-top: 38px;
        text-align: center;
        .mes {
          display: inline-block;
          padding: 0 35px;
          height: 70px;
          line-height: 70px;
          border-radius: 35px;
          border: 2px solid #01c6ae;
          background: #fff;
          font-size: 30px;
          color: #ff8a4b;
        }
        .add {
          margin: 0 30px;
          font-size: 30px;
          color: #ff8a4b;
        }
      }
      .price {
        margin-top: 68px;
        text-align: center;
        font-size: 37px;
        color: #fff;
        span {
          font-size: 75px;
          color: #ff8a4b;
        }
      }
      .tip {
        margin-top: 26px;
        text-align: center;
        color: #fff;
        font-size: 26px;
      }
      .concat {
        width: 830px;
        height: 60px;
        margin: 40px auto 0;
        line-height: 60px;
        color: #fff;
        text-align: center;
        font-size: 30px;
        border-radius: 30px;
        background: #ff8a4b;
        box-shadow: 0px 5px 13px 0px 
		rgba(16, 36, 37, 0.3);
      }
    }
  }
  .zx-wrap {
    width: 100%;
    height: 300px;
    background: url('../assets/images/zx-bg.jpg') no-repeat;
    background-size: cover;
    .zx-content {
      width: 1200px;
      height: 300px;
      position: relative;
      margin: 0 auto;
      .yisheng {
        width: 112px;
        height: 291px;
        position: absolute;
        top: -30px;
        left: 104px;
      }
      .text {
        font-size: 26px;
        color: #fff;
        width: 184px;
        position: absolute;
        top: 100px;
        left: 270px;
        line-height: 39px;
      }
      .qrcodes {
        width: 470px;
        height: 215px;
        position: absolute;
        top: 45px;
        right: 150px;
        display: flex;
        justify-content: space-between;
        .qrcode {
          width: 180px;
          height: 215px;
          img {
            width: 180px;
            height: 180px;
          }
          p {
            width: 100%;
            text-align: center;
            font-size: 16px;
            color: #fff;
            margin-top: 20px;
          }
        }
      }
    }
  }
  .foot-wrap {
    width: 100%;
    height: 646px;
    background: url('../assets/images/foot-bg.png') no-repeat;
    background-size: cover;
    .foot-content { 
      position: relative;
      width: 1200px;
      margin: 0 auto;
    }
    .title {
      position: relative;
      padding-top: 48px;
      padding-bottom: 36px;
      font-size: 52px;
      color: #fff;
      font-weight: 700;
      text-align: center;
      border-bottom: 1px solid #fff;
      &::after {
        position: absolute;
        content: '';
        left: 50%;
        bottom: 0;
        width: 300px;
        height: 8px;
        margin-left: -150px;
        background: #fff;
      }
    }
    .subtitle {
      margin-top: 30px;
      font-size: 30px;
      color: #fff;
      text-align: center;
      a {
        color: #ffb085;
      }
    }
    .content {
      position: absolute;
      right: 0;
      top: 290px;
      width: 580px;
      font-size: 16px;
      line-height: 34px;
      color: #fff;
      p {
        letter-spacing: 2px;
      }
      .button {
        margin-top: 50px;
        width: 100%;
        height: 60px;
        line-height: 60px;
        background: #ff8a4b;
        color: #fff;
        font-size: 30px;
        text-align: center;
        border-radius: 6px;
        cursor: pointer;
      }
    }
  }
  .fotter {
    width: 100%;
    height: 50px;
    background: #303030;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    p {
      font-size: 14px;
      font-weight: normal;
      color: #b5b5b5;
      letter-spacing: 1px;
      &.pl {
        padding-left: 15px;
      }
      a {
        font-size: 14px;
        font-weight: normal;
        color: #b5b5b5;
        letter-spacing: 1px;
      }
    }
  }
  .advertising {
    width: 100%;
    height: 142px;
    background: #3f4c5b;
    position: relative;
    &-content {
      width: 1200px;
      height: 100%;
      margin: 0 auto;
      display: flex;
      justify-content: center;
      align-items: center;
      .gift {
        width: 214px;
        height: 100%;
        position: relative;
        >img {
          width: 214px;
          height: 133px;
          position: absolute;
          left: 0;
          bottom: 0;
        }
        >p {
          width: 100%;
          text-align: center;
          font-size: 20px;
          color: #f4381c;
          position: absolute;
          left: 0;
          bottom: 25px;
        }
      }
      .form {
        margin-left: 28px;
        >p {
          font-size: 14px;
          font-weight: normal;
          color: #fff;
          letter-spacing: 1px;
        }
        &-item {
          display: flex;
          align-items: center;
          margin: 14px 0;
          input {
            border: 0;
            box-sizing: border-box;
            padding: 0 15px;
          }
          .phone {
            width: 329px;
            height: 45px;
            background: #fff;
            border-radius: 6px;
            font-size: 14px;
            color: #999;
          }
          .code-item {
            width: 270px;
            height: 45px;
            margin-left: 23px;
            position: relative;
            .code {
              width: 100%;
              height: 45px;
              background: #fff;
              border-radius: 6px;
              font-size: 14px;
              color: #999;
            }
            .code-btn {
              width: 132px;
              height: 30px;
              line-height: 30px;
              position: absolute;
              top: 8px;
              right: 12px;
              background: #01c6ae;
              border-radius: 6px;
              text-align: center;
              font-size: 14px;
              letter-spacing: 1px;
              color: #fff;
              cursor: pointer;
            }
          }
          .submit {
            width: 171px;
            height: 45px;
            line-height: 45px;
            margin-left: 23px;
            background-color: #ff8a4b;
            border-radius: 6px;
            font-size: 16px;
            color: #fff;
            letter-spacing: 1px;
            text-align: center;
            cursor: pointer;
          }
        }
        .agreement {
          display: flex;
          align-items: center;
          label {
            width: 14px;
            height: 14px;
            display: block;
            position: relative;
            cursor: pointer;
            .checkbox {
              cursor: pointer;
              margin: 0;
              &:checked + .show-box:before {
                content: '';
                position: absolute;
                top: 1px;
                left: 5px;
                width: 3px;
                height: 8px;
                border: solid #01c6ae;
                border-width: 0 2px 2px 0;
                transform: rotate(45deg);
              }
            }
            .show-box {
              position: absolute;
              top: 0;
              left: 0;
              width: 14px;
              height: 14px;
              border-radius: 2px;
              background: #fff;
            }
          }
          >p {
            font-size: 14px;
            color: #fff;
            margin-left: 10px;
            span {
              color: #01c6ae;
              cursor: pointer;
            }
          }
        }
      }
    }
    &-close {
      width: 14px;
      height: 14px;
      line-height: 14px;
      position: absolute;
      top: 16px;
      right: 13px;
      text-align: center;
      font-size: 14px;
      color: #fff;
      cursor: pointer;
    }
  }
</style>