<template>
  <div>
    <v-header />
    <div class="title">
      首页>详情页>{{ title }}
    </div>
    <div
      v-if="type == 1"
      class="container">
      <div class="content">
        <div class="content-left">
          <div class="top">
            <h2>{{ title }}测试题</h2>
            <div
              id="desc" 
              class="desc">
              <p>试卷说明：本次考察内容为{{ courseTile }}全部课程，请认真作答</p>
              共{{ itemCount }}题，总分{{ sumScore }}分，{{ duringDate() }}答题限时{{ limitTime }}分钟
            </div>
          </div>
          <div class="question">
            <div
              v-if="!!questionList1.length"
              class="list">
              <div class="list-title">
                一、单选题
                <span>(共{{ questionList1.length }}题，共{{ singleScore(1) }}分)</span>
              </div>
              <ul>
                <li
                  v-for="(item, index) in questionList1"
                  :key="index"
                  :id="'question' + index">
                  <p>
                    {{ index + 1 }}、{{ item.stem }}
                    <span>({{ item.score }}分)</span>
                  </p>
                  <el-radio-group v-model="form[index]">
                    <el-radio
                      v-for="(option, index) in item.optionContent"
                      :key="index"
                      :label="option.name"
                      style="display: block;margin-left: 0; line-height:30px;">{{ option.name }}: {{ option.content }}</el-radio>
                  </el-radio-group>
                </li>
              </ul>
            </div>
            <div
              v-if="!!questionList2.length"
              class="list">
              <div class="list-title">
                二、多选题
                <span>(共{{ questionList2.length }}题，共{{ singleScore(2) }}分)</span>
              </div>
              <ul>
                <li
                  v-for="(item, index) in questionList2"
                  :key="index"
                  :id="'question'+ (singleSize(2) + index)">
                  <p>
                    {{ singleSize(2) + index + 1 }}、{{ item.stem }}
                    <span>({{ item.score }}分)</span>
                  </p>
                  <el-checkbox-group v-model="form[singleSize(2) + index]">
                    <el-checkbox
                      v-for="(option, index) in item.optionContent"
                      :key="index"
                      :label="option.name"
                      style="display: block;margin-left: 0; line-height:30px;">
                      {{ option.name }}: {{ option.content }}</el-checkbox>
                  </el-checkbox-group>
                </li>
              </ul>
            </div>
            <!-- <div
              v-show="type == 3"
              v-if="list && list.length > 0"
              class="list">
              <div class="list-title">
                三、不定项选择题
                <span>(共{{ list.length }}题)</span>
              </div>
              <ul>
                <li
                  v-for="(item, index) in list"
                  :key="index">
                  <p>
                    {{ index + 1 }}、{{ item.stem }}
                  </p>
                  <el-checkbox-group v-model="form.item3[index]">
                    <el-checkbox
                      v-for="(option, index) in item.optionContent"
                      :key="index"
                      :label="option"
                      style="display: block;margin-left: 0; line-height:30px;">
                      {{ letterArray[index] }}: {{ option }}</el-checkbox>
                  </el-checkbox-group>
                </li>
              </ul>
            </div> -->
            <div
              v-if="!!questionList4.length"
              class="list">
              <div class="list-title">
                三、判断题
                <span>(共{{ questionList4.length }}题，共{{ singleScore(4) }}分)</span>
              </div>
              <ul>
                <li
                  v-for="(item, index) in questionList4"
                  :key="index"
                  :id="'question'+ (singleSize(4) + index)">
                  <p>
                    {{ singleSize(4) + index + 1 }}、{{ item.stem }}
                    <span>({{ item.score }}分)</span>
                  </p>
                  <el-radio-group v-model="form[singleSize(4) + index]">
                    <el-radio
                      label="true"
                      style="display: block;margin-left: 0; line-height:30px;">
                      正确</el-radio>
                    <el-radio
                      label="false"
                      style="display: block;margin-left: 0; line-height:30px;">
                      错误</el-radio>
                  </el-radio-group>
                </li>
              </ul>
            </div>
            <div
              v-if="!!questionList5.length"
              class="list">
              <div class="list-title">
                四、填空题
                <span>(共{{ questionList5.length }}题，共{{ singleScore(5) }}分)</span>
              </div>
              <ul>
                <li
                  v-for="(item, index) in questionList5"
                  :key="index"
                  :id="'question'+ (singleSize(5) + index)">
                  <p>
                    {{ singleSize(5) + index + 1 }}、{{ item.stem }} <span>({{ item.score }}分)</span>
                  </p>
                  <div class="answer">
                    <span>作答：</span>
                    <el-input
                      v-for="idx in item.answerLength"
                      v-model="form[singleSize(5) + index][idx]"
                      :key="idx"
                      :placeholder="'请输入你第'+(idx+1)+'个的答案'" 
                      class="input1"/> 
                  </div>
                </li>
              </ul>
            </div>
            <div
              v-if="!!questionList6.length"
              class="list">
              <div class="list-title">
                五、简答题
                <span>(共{{ questionList6.length }}题，共{{ singleScore(6) }}分)</span>
              </div>
              <ul>
                <li
                  v-for="(item, index) in questionList6"
                  :key="index"
                  :id="'question'+ (singleSize(6) + index)">
                  <p>
                    {{ singleSize(6) + index + 1 }}、{{ item.stem }} <span>({{ item.score }}分)</span>
                  </p>
                  <div class="answer">
                    <span style="margin-top: 0px;">作答：</span>
                    <el-input
                      v-if="show[index]"
                      v-model="form[ singleSize(6) + index]"
                      :autosize="{ minRows: 4}"
                      type="textarea"
                      class="input2"
                      placeholder="请输入你的答案" />
                    <div 
                      v-if="!show[index]"
                      class="jdcontent">{{ form[ singleSize(6) + index] }} 
                      <i 
                        class="iconfont iconxiugai07" 
                        @click="show[index] = true"/></div>
                    <div
                      v-if="show[index]"
                      class="save">
                      <div
                        class="saves"
                        @click="show[index] = false">保存</div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div
              v-if="!!questionList7.length"
              class="list">
              <div class="list-title">
                六、分析题
                <span>(共{{ questionList7.length }}题，共{{ signleScore(7) }}分)</span>
              </div>
              <ul>
                <li
                  v-for="(item, index) in questionList7"
                  :key="index"
                  :id="'question'+(singleSize(7) + index)"
                  class="analysis">
                  <p>
                    {{ singleSize(7) + index + 1 }}、{{ item.stem }}
                    <span>({{ item.score }}分)</span>
                  </p>
                  <div>
                    <ul
                      v-for="(item1, index1) in item.childrenList"
                      :key="index1">
                      <li
                        v-if="item1.typeId == 1">
                        <p>
                          {{ index1 + 1 }}) <span class="a-title">单选题</span>{{ item1.stem }} <span>{{ item1.score }}分</span>
                        </p>
                        <el-radio-group v-model="form[singleSize(7) + index][index1]">
                          <el-radio
                            v-for="(option, idx) in item1.optionContent"
                            :key="idx"
                            :label="option.name"
                            style="display: block;margin-left: 0; line-height:30px;">{{ option.name }}: {{ option.content }}</el-radio>
                        </el-radio-group>
                      </li>
                      <li
                        v-if="item1.typeId == 2">
                        <p>
                          {{ index1 + 1 }}) <span class="a-title">多选题</span>{{ item1.stem }} <span>{{ item1.score }}分</span>
                        </p>
                        <el-checkbox-group v-model="form[singleSize(7) + index][index1]">
                          <el-checkbox
                            v-for="(option, idx) in item1.optionContent"
                            :key="idx"
                            :label="option.name"
                            style="display: block;margin-left: 0; line-height:30px;">
                            {{ option.name }}: {{ option.content }}</el-checkbox>
                        </el-checkbox-group>
                      </li>
                      <li
                        v-if="item1.typeId == 4">
                        <p>
                          {{ index1 + 1 }}) <span class="a-title">判断题</span>{{ item1.stem }} <span>{{ item1.score }}分</span>
                        </p>
                        <el-radio-group v-model="form[singleSize(7) + index][index1]">
                          <el-radio
                            label="true"
                            style="display: block;margin-left: 0; line-height:30px;">
                            正确</el-radio>
                          <el-radio
                            label="false"
                            style="display: block;margin-left: 0; line-height:30px;">
                            错误</el-radio>
                        </el-radio-group>
                      </li>
                      <li
                        v-if="item1.typeId == 5">
                        <p>
                          {{ index1 + 1 }}) <span class="a-title">填空题</span>{{ item1.stem }} <span>{{ item1.score }}分</span>
                        </p>
                        <div class="answer">
                          <span>作答：</span>
                          <el-input
                            v-for="idx in item1.answerLength"
                            :key="idx"
                            v-model="form[singleSize(7) + index][index1][idx - 1]"
                            :placeholder="'请输入你的'+(idx)+'答案'"
                            class="input1" />
                        </div>
                      </li>
                      <li
                        v-if="item1.typeId == 6">
                        <p>
                          {{ index1 + 1 }}) <span class="a-title">简答题</span>{{ item1.stem }} <span>{{ item1.score }}分</span>
                        </p>
                        <div class="answer">
                          <span>作答：</span>
                          <el-input
                            v-model="form[singleSize(7) + index][index1]"
                            :autosize="{ minRows: 4}"
                            type="textarea"
                            class="input2"
                            placeholder="请输入你的答案" />
                        </div>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>  
        <div class="content-right">
          <div
            v-if="type == 1" 
            class="header">
            <div class="rest">剩余时间</div>
            <span>{{ leftTimeStrmin }} </span> 分<span> {{ leftTimeStrsec }} </span> 秒
          </div>
          <ul class="list">
            <li
              v-for="(item, index) in list"
              :key="index"
              :class="form[index] && form[index].length >0? 'active' : ''">
              <a 
                :href="'#question'+index">
                {{ index + 1 }}
              </a>
            </li>
          </ul>
          <div class="status">
            <span class="none">未答</span>
            <span class="complete">已答</span>
          </div>
          <div
            class="button"
            @click="submit(1)">我要交卷</div>
        </div>
      </div>
    </div>
    <div
      v-else
      class="container">
      <div class="score">
        <h2>学员<span>{{ userName }}</span>{{ title }}答题情况</h2>
        <div class="table">
          <!-- <table border="1">
            <thead>
              <tr>
                <th>测试</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>ceshoi</td>
              </tr>
            </tbody>
          </table> -->
          <table border="1">
            <thead>
              <tr>
                <th style="padding: 0 12px">题型</th>
                <th>单选题（{{ singleSize(1) }}题）</th>
                <th>多选题（{{ singleSize(2) }}题）</th>
                <th>判断题（{{ singleSize(4) }}题）</th>
                <th>填空题（{{ singleSize(5) }}题）</th>
                <th>简答题（{{ singleSize(6) }}题）</th>
                <th>分析题（{{ singleSize(7) }}题）</th>
                <th>总得分</th>
              </tr>
            </thead>
            <tbody>
              <tr style="color: red">
                <td>得分</td>
                <td>{{ form1.item1.typeId? form1.item1.score : 0 }}分</td>
                <td>{{ form1.item2.typeId? form1.item2.score : 0 }}分</td>
                <td>{{ form1.item4.typeId? form1.item4.score : 0 }}分</td>
                <td>{{ form1.item5.typeId? form1.item5.score : 0 }}分</td>
                <td>{{ form1.item6.typeId? form1.item6.score : 0 }}分</td>
                <td>{{ form1.item7.typeId? form1.item7.score : 0 }}分</td>
                <td
                  v-if="type == 2 && markingStatus == 0"
                  rowspan="4"
                  style="vertical-align:middle;text-align:center">
                  {{ result.objectScore || 0 }} + ?分
                  <div style="color: #333">答题耗时{{ Math.ceil(result.answerTime) }}分钟</div>
                </td>
                <td
                  v-if="type == 2 && markingStatus != 0"
                  rowspan="4"
                  style="vertical-align:middle;text-align:center">
                  {{ result.objectScore + result.subjectScore || 0 }}分
                  <div style="color: #333">答题耗时{{ Math.ceil(result.answerTime) }}分钟</div>
                </td>
                <td
                  v-if="type == 3 && markingStatus == 0"
                  rowspan="4"
                  style="vertical-align:middle;text-align:center">
                  {{ result.objectScore || 0 }} + ?分
                  <div style="color: #333">答题耗时{{ Math.ceil(result.answerTime) }}分钟</div>
                </td>
                <td
                  v-if="type == 3 && markingStatus != 0"
                  rowspan="4"
                  style="vertical-align:middle;text-align:center">
                  {{ result.subjectScore+result.objectScore || 0 }}分
                  <div style="color: #333">答题耗时{{ Math.ceil(result.answerTime) }}分钟</div>
                </td>
              </tr>
              <tr>
                <td>答对</td>
                <td>{{ form1.item1.typeId? form1.item1.rightCount : 0 }}题</td>
                <td>{{ form1.item2.typeId? form1.item2.rightCount : 0 }}题</td>
                <td>{{ form1.item4.typeId? form1.item4.rightCount : 0 }}题</td>
                <td>{{ form1.item5.typeId? form1.item5.rightCount : 0 }}题</td>
                <td>{{ form1.item6.typeId? form1.item6.rightCount : 0 }}题</td>
                <td>{{ form1.item7.typeId? form1.item7.rightCount : 0 }}题</td>
              </tr>
              <tr>
                <td>答错</td>
                <td>{{ form1.item1.typeId? form1.item1.missCount : 0 }}题</td>
                <td>{{ form1.item2.typeId? form1.item2.missCount : 0 }}题</td>
                <td>{{ form1.item4.typeId? form1.item4.missCount : 0 }}题</td>
                <td>{{ form1.item5.typeId? form1.item5.missCount : 0 }}题</td>
                <td>{{ form1.item6.typeId? form1.item6.missCount : 0 }}题</td>
                <td>{{ form1.item7.typeId? form1.item7.missCount : 0 }}题</td>
              </tr>
              <tr>
                <td>漏答</td>
                <td>{{ form1.item1.typeId? form1.item1.unCount : 0 }}题</td>
                <td>{{ form1.item2.typeId? form1.item2.unCount : 0 }}题</td>
                <td>{{ form1.item4.typeId? form1.item4.unCount : 0 }}题</td>
                <td>{{ form1.item5.typeId? form1.item5.unCount : 0 }}题</td>
                <td>{{ form1.item6.typeId? form1.item6.unCount : 0 }}题</td>
                <td>{{ form1.item7.typeId? form1.item7.unCount : 0 }}题</td>
              </tr>
              <tr>
                <td>评语</td>
                <td
                  v-if="markingStatus != 0"
                  colspan="8"
                  style="color: #636363">{{ comment }}</td>
                <td
                  v-else
                  colspan="8"
                  style="color: #636363">批阅中</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div
          id="desc" 
          class="desc">
          试卷说明：本次考察内容为{{ courseTile }}全部课程，请认真作答
          共{{ itemCount }}题，总分{{ sumScore }}分，{{ duringDate() }}答题限时{{ limitTime }}分钟
        </div>
      </div>
      <div class="content">
        <div
          id="content-left" 
          class="content-left">
          <div
            v-for="(item,index) in list"
            :key="index" 
            class="question">
            <div
              v-if="list && singleSize(1) > 0"
              class="list">
              <div 
                v-if=" index == 0 "
                class="list-title">
                一、单选题
                <span>(共{{ singleSize(1) }}题，共{{ singleScore(1) }}分)</span>
              </div>
              <ul>
                <li
                  v-if="item.typeId == 1"
                  :id="'question'+index">
                  <p>
                    {{ index + 1 }}、{{ item.stem }} <span>({{ item.score }}分)</span>
                  </p>
                  <el-radio-group v-model="list[index].userAnswer">
                    <el-radio
                      v-for="(option, index) in item.optionContent"
                      :key="index"
                      :label="option.name"
                      style="display: block;margin-left: 0; line-height:30px;"
                      disabled>
                      {{ option.name }}: {{ option.content }}
                      <span
                        v-if="list[index].userAnswer == option.name"
                        style="margin-left: 30px">(已选)</span>
                    </el-radio>
                  </el-radio-group>
                  <div class="analyse">
                    <span 
                      v-if="item.userAnswer == item.answer"
                      class="right">回答正确</span>
                    <span
                      v-else
                      class="false">回答错误，正确答案是{{ item.answer }}</span>
                    <span
                      v-if="item.collectionStatus == 1"
                      @click="collection(item.questionId)"><i class="iconfont icon02"/>收藏本题</span>
                    <span
                      v-if="item.collectionStatus == 0"
                      @click="cancelCollection(item.questionId)"><i class="iconfont iconaixin active"/>已收藏</span>
                    <div
                      class="jxbutton"
                      @click="toggle">解析<i class="iconfont iconarrow-right"/></div>
                    <div class="desc">
                      {{ item.analysis? item.analysis : '无' }}
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div
              v-if="list && singleSize(2) > 0"
              class="list">
              <div 
                v-if="index == singleSize(1)-1"
                class="list-title">
                二、多选题
                <span>(共{{ singleSize(2) }}题，共{{ singleScore(2) }}分)</span> 
              </div>
              <ul>
                <li
                  v-if="item.typeId == 2"
                  :id="'question'+index">
                  <p>
                    {{ index + 1 }}、{{ item.stem }} <span>({{ item.score }}分)</span>
                  </p>
                  <el-checkbox-group v-model="dxform[index]">
                    <el-checkbox
                      v-for="(option, index) in item.optionContent"
                      :key="index"
                      :label="option.name"
                      style="display: block;margin-left: 0; line-height:30px;"
                      disabled>
                      {{ option.name }}: {{ option.content }}</el-checkbox>
                  </el-checkbox-group>
                  <div class="analyse">
                    <span 
                      v-if="item.userAnswer == item.answer"
                      class="right">回答正确</span>
                    <span
                      v-else
                      class="false">回答错误，正确答案是{{ item.answer }}</span>
                    <span
                      v-if="item.collectionStatus == 1"
                      @click="collection(item.questionId)"><i class="iconfont icon02"/>收藏本题</span>
                    <span
                      v-if="item.collectionStatus == 0"
                      @click="cancelCollection(item.questionId)"><i class="iconfont iconaixin active"/>已收藏</span>
                    <div
                      class="jxbutton"
                      @click="toggle">解析<i class="iconfont iconarrow-right"/></div>
                    <div class="desc">
                      {{ item.analysis? item.analysis : '无' }}
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <!-- <div
              v-show="type == 3"
              v-if="list && list.length > 0"
              class="list">
              <div class="list-title">
                三、不定项选择题
                <span>(共{{ list.length }}题)</span>
              </div>
              <ul>
                <li
                  v-for="(item, index) in list"
                  :key="index">
                  <p>
                    {{ index + 1 }}、{{ item.stem }}
                  </p>
                  <el-checkbox-group v-model="form.item3[index]">
                    <el-checkbox
                      v-for="(option, index) in item.optionContent"
                      :key="index"
                      :label="option"
                      style="display: block;margin-left: 0; line-height:30px;">
                      {{ letterArray[index] }}: {{ option }}</el-checkbox>
                  </el-checkbox-group>
                </li>
              </ul>
            </div> -->
            <div
              v-if="list && singleSize(4) > 0"
              class="list">
              <div
                v-if="index == singleSize(1)+singleSize(2)-1" 
                class="list-title">
                三、判断题
                <span>(共{{ singleSize(4) }}题，共{{ singleScore(4) }}分)</span>
              </div>
              <ul>
                <li
                  v-if="item.typeId == 4"
                  :id="'question'+index">
                  <p>
                    {{ index + 1 }}、{{ item.stem }} <span>({{ item.score }}分)</span>
                  </p>
                  <el-radio-group v-model="list[index].userAnswer">
                    <el-radio
                      label="true"
                      style="display: block;margin-left: 0; line-height:30px;"
                      disabled>
                      正确</el-radio>
                    <el-radio
                      label="false"
                      style="display: block;margin-left: 0; line-height:30px;"
                      disabled>
                      错误</el-radio>
                  </el-radio-group>
                  <div class="analyse">
                    <span 
                      v-if="item.status == 1"
                      class="false">您未作答</span>
                    <span 
                      v-else-if="item.status == 2"
                      class="right">回答正确</span>
                    <span
                      v-else-if="item.status = 3"
                      class="false">回答错误，正确答案是{{ item.answer }}</span>
                    <span
                      v-if="item.collectionStatus == 1"
                      @click="collection(item.questionId)"><i class="iconfont icon02"/>收藏本题</span>
                    <span
                      v-if="item.collectionStatus == 0"
                      @click="cancelCollection(item.questionId)"><i class="iconfont iconaixin active"/>已收藏</span>
                    <div
                      class="jxbutton"
                      @click="toggle">解析<i class="iconfont iconarrow-right"/></div>
                    <div class="desc">
                      {{ item.analysis? item.analysis : '无' }}
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div
              v-if="list && singleSize(5) > 0"
              class="list">
              <div 
                v-if="index == singleSize(1)+singleSize(2)+singleSize(4)-1"
                class="list-title">
                四、填空题
                <span>(共{{ singleSize(5) }}题，共{{ singleScore(5) }}分)</span>
              </div>
              <ul>
                <li
                  v-if="item.typeId == 5"
                  :id="'question'+index">
                  <p>
                    {{ index + 1 }}、{{ item.stem }} <span>({{ item.score }}分)</span>
                  </p>
                  <div class="answer">
                    <span style="position:relative;top: 0;">您的作答：</span>
                    {{ item.userAnswer=''? '您未作答' : dxform[index] }}
                  </div>
                  <div class="analyse">
                    <span 
                      v-if="item.status == 2"
                      class="right">回答正确</span>
                    <span
                      v-else-if="item.status == 3"
                      class="false">回答错误，正确答案是{{ item.tkform[index] }}</span>
                    <span
                      v-if="item.collectionStatus == 1"
                      @click="collection(item.questionId)"><i class="iconfont icon02"/>收藏本题</span>
                    <span
                      v-if="item.collectionStatus == 0"
                      @click="cancelCollection(item.questionId)"><i class="iconfont iconaixin active"/>已收藏</span>
                    <div
                      class="jxbutton"
                      @click="toggle">解析<i class="iconfont iconarrow-right"/></div>
                    <div class="desc">
                      {{ item.analysis? item.analysis : '无' }}
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div
              v-if="list && singleSize(6) > 0"
              class="list">
              <div
                class="list-title">
                五、简答题
                <span>(共{{ singleSize(6) }}题，共{{ singleScore(6) }}分)</span>
              </div>
              <ul>
                <li
                  v-if="item.typeId == 6"
                  :id="'question'+index">
                  <p>
                    {{ index + 1 }}、{{ item.stem }} <span>({{ item.score }}分)</span>
                  </p>
                  <div class="answer">
                    <span style="margin-top: 0px;position:relative;top: 0;">您的作答：</span>
                    <div class="jdcontent">
                      {{ item.userAnswer? '您未作答' : item.userAnswer }} 
                    </div>
                    <div
                      style="margin-left: 0" 
                      class="analyse">
                      <div style="color:#333;margin-bottom: 27px;">
                        阅卷得分:
                        <span 
                          v-if=" item.status == 4 && userInfo.roleName == 'zyy_student'"
                          style="margin-top: 0px;position:relative;top: 0;"
                          class="false">老师批阅中   </span>
                        <span 
                          v-else
                          style="margin-top: 0px;position:relative;top: 0;">
                          <input 
                            v-model="score[index]" 
                            type="text" 
                            placeholder="学员得分">分
                        </span>
                        <span 
                          v-if=" item.status == 5"
                          style="margin-top: 0px;position:relative;top: 0;">{{ item.score }}   </span>
                        <span
                          v-if="item.collectionStatus == 1"
                          style="margin: 0px 0px 0px 30px;position:relative;top: 0;"
                          @click="collection(item.questionId)"><i class="iconfont icon02"/>收藏本题</span>
                        <span
                          v-if="item.collectionStatus == 0"
                          style="margin-top: 0px;position:relative;top: 0;"
                          @click="cancelCollection(item.questionId)"><i class="iconfont iconaixin active"/>已收藏</span>
                      </div>
                      <div><span style="color: #333;margin-top: 0px;position:relative;top: 0;">参考答案：</span>{{ item.answer }}</div>
                      <div
                        style="margin-top: 20px;">
                        <span style="color: #333;margin-top: 0px;position:relative;top: 0;">老师评语：</span>
                        <span 
                          v-if=" item.status == 4 && userInfo.roleName =='zyy_student'" 
                          style="margin-top: 0px;position:relative;top: 0;"
                          class="false">老师批阅中</span>
                        {{ item.comment? item.comment : form[index] }} 
                        <div
                          v-if="show[index] && item.status == 4 && userInfo.roleName !='zyy_student' "
                          style="margin-top: 20px;">
                          <el-input
                            v-model="form[index]"
                            :autosize="{ minRows: 4}"
                            type="textarea"
                            class="input2"
                            placeholder="输入您的评语" />
                          <div
                            class="save">
                            <div
                              class="saves"
                              @click="getSubmission(item.questionId,form[index],score[index])">提交评语
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div
              v-if="list && singleSize(7) > 0"
              class="list">
              <div 
                v-if="index == list.length-singleSize(7)-1"
                class="list-title">
                六、分析题
                <span>(共{{ singleSize(7) }}题，共{{ singleScore(7) }}分)</span>
              </div>
              <ul>
                <li
                  v-if="item.typeId == 7"
                  :id="'question'+index"
                  class="analysis">
                  <p>
                    {{ index + 1 }}、{{ item.stem }}
                  </p>
                  请回答以下问题：
                  <div>
                    <ul>
                      <li
                        v-for="(item1, index1) in item.childrenList"
                        v-show="item1.typeId == 1"
                        :key="index1">
                        <p>
                          {{ index1 + 1 }}) <span class="a-title">单选题</span>{{ item1.stem }} <span>({{ item1.score }}分)</span>
                        </p>
                        <el-radio-group v-model="form7[index1]">
                          <el-radio
                            v-for="(option, index) in item1.optionContent"
                            :key="index"
                            :label="option.name"
                            style="display: block;margin-left: 0; line-height:30px;"
                            disabled>{{ option.name }}: {{ option }}</el-radio>
                        </el-radio-group>
                      </li>
                    </ul>
                  </div>
                  <div class="dx1">
                    <ul>
                      <li
                        v-for="(item1, index1) in item.childrenList"
                        v-show="item1.typeId == 2"
                        :key="index1">
                        <p>
                          {{ index + 1 }}）<span>多选题</span>{{ item.stem }}
                        </p>
                        <el-checkbox-group v-model="form7[index1]">
                          <el-checkbox
                            v-for="(option, index) in item1.optionContent"
                            :key="index"
                            :label="option.name"
                            style="display: block;margin-left: 0; line-height:30px;">
                            {{ option.name }}: {{ option.content }}</el-checkbox>
                        </el-checkbox-group>
                      </li>
                    </ul>
                  </div>
                  <div class="tk">
                    <ul>
                      <li
                        v-for="(item1, index1) in item.childrenList"
                        v-show="item1.typeId == 5"
                        :key="index1">
                        <p>
                          {{ index + 1 }}) <span>填空题</span>{{ item1.stem }}
                        </p>
                        <div class="answer">
                          <span>作答：</span>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div class="pd">
                    <ul>
                      <li
                        v-for="(item1, index1) in item.childrenList"
                        v-show="item1.typeId == 4"
                        :key="index1">
                        <p>
                          {{ index + 1 }}） <span>判断题</span>{{ item.stem }}
                        </p>
                        <el-radio-group v-model="form7[index1]">
                          <el-radio
                            label="true"
                            style="display: block;margin-left: 0; line-height:30px;">
                            正确</el-radio>
                          <el-radio
                            label="false"
                            style="display: block;margin-left: 0; line-height:30px;">
                            错误</el-radio>
                        </el-radio-group>
                      </li>
                    </ul>
                  </div>
                  <div class="jd">
                    <ul>
                      <li
                        v-for="(item1, index1) in item.childrenList"
                        v-show="item1.typeId == 6"
                        :key="index1">
                        <p>
                          {{ index + 1 }}） 简答题{{ item.stem }}
                        </p>
                        <div class="answer">
                          <span>作答：</span>
                          <el-input
                            v-model="form7[index1]"
                            placeholder="请输入你的答案" />
                        </div>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div
          id="content-right" 
          :class="rightFix == true? 'content-right isFix' : 'content-right' ">
          <ul class="list">
            <li
              v-for="(item,index) in list"
              :key="index"
              :class="list[index].status == 1?'':list[index].status ==2?'active':list[index].status ==3?'wrong':list[index].status ==4?'none':''">
              <a :href="'#question' + index">{{ index + 1 }}</a>
            </li>
          </ul>
          <div class="status">
            <span class="none">未答</span>
            <span class="complete">答对</span>
            <span class="wrong">答错</span>
            <div style="margin-top: 20px">
              <span class="wait">待批阅</span>
              <span class="collect"><i class="iconfont iconaixin"/> 收藏</span>
            </div>
          </div>
          <div
            v-if="type == 2 && markingStatus == 0"
            class="button">老师批阅中</div>
          <div
            v-else-if="type == 3 && markingStatus == 0"
            class="button"
            @click="teacherSumit()">提交批阅结果</div>
        </div>
      </div>
    </div>  
  </div>
</template>
<script>
import Header from '~/components/layout/header.vue'
import Cookies from 'js-cookie'
export default {
  components: {
    'v-header': Header
  },
  data() {
    return {
      loading: null,
      type: this.$route.query.type || '', // 1、未答  2： 已答   3 批阅
      title: '',
      comment:'',
      userInfo: '',
      userName: '',
      paperId: this.$route.query.examPaperId || null,
      studentId: this.$route.query.studentId || null,
      resultId: this.$route.query.resultId || null,
      leftTime: 7200,
      leftTimeStr: '',
      leftTimeStrmin: '',
      leftTimeStrsec: '',
      timer: null,
      timer2: null,
      itemCount: null,
      limitTime: null,
      rightFix: false,
      courseTile: '',
      examDateStatus: null,
      sumScore: null, 
      showModal: false,
      answerTime: null,
      leftSum: 0,
      showTeacher: '',
      formInline: {
        question: '',
        range: ''
      },
      show: [],
      result:[],
      score:[],
      form: [],
      dxform:[],
      tkform:[],
      form1:{
        item1:[],
        item2:[],
        item3:[],
        item4:[],
        item5:[],
        item6:[],
        item7:[],
      },
      item5:[],
      form7:[],
      list: [],
      lessonList: [],
      typeList: [],
      letterArray: ['A', 'B', 'C', 'D', 'E', 'F'],
      questionList1: [],
      questionList2: [],
      questionList3: [],
      questionList4: [],
      questionList5: [],
      questionList6: [],
      questionList7: [],
      markingStatus: null
    }
  },
  mounted() {
    this.userInfo = Cookies.getJSON('zyy_userInfo')
    console.log(this.userInfo.roleName)
    if(this.userInfo.roleName =='zyy_student' || this.userInfo.roleName =='zyy_admin'){
      console.log('zyy-admin')
      this.getList()
    }else{
      this.getTeacherlist()
      window.addEventListener('scroll', this.handleScroll)
    }
    //this.getLessonList()
    // this.getTypeList()
  },
  methods: {
    handleSubmit(time) {
      this.timer2 = setInterval( () => {
        this.submitSimulatedVolume(0)
      }, time * 1000)
    },
    handleScroll () {
      var rightMenu = document.querySelector('#desc').offsetTop;
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      scrollTop > rightMenu ? this.rightFix = true : this.rightFix = false
    },
    singleSize(typeId){
      let z = 0
      if(this.type == 1) {
        for(let i=0;i < this.list.length;i++){
          if(this.list[i].typeId < typeId){
            z++;
          }
        }
      } else {
        for(let i=0;i < this.list.length;i++){
          if(this.list[i].typeId == typeId){
            z++;
          }
        }
      }
      return z;
    },
    singleScore(typeId){
      let z = 0
      for(let i=0;i < this.list.length;i++){
        if(this.list[i].typeId == typeId){
          z = z+this.list[i].score
        }
      }
      return z;
    },
    initTime() {
      this.timer = setInterval(() => {
        this.formatTime(this.leftTime --)
      }, 1000)
    },
    formatTime(time) {
      if(time <= 0) {
        clearInterval(this.timer)
        this.submitSimulatedVolume(1)
        return
      }
      let minutes = Math.floor(time / 60) > 9 ? Math.floor(time / 60) : '0' + Math.floor(time / 60)
      let seconds = time % 60 > 9 ? time % 60 : '0' + time % 60
      this.leftTimeStr = `${minutes}:${seconds}`
      this.leftTimeStrmin = minutes,
      this.leftTimeStrsec = seconds
    },
    getList() {
      console.log('getList')
      this.loading = this.$loading({
        lock: true,
        text: '正在加载中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      this.$axios('/yxs/api/web/question/startAnswer', {
        params: {
          examPaperId: this.paperId,
          userToken: this.userInfo.userToken,
          resultId: this.type == 1 ? '' : this.resultId,
          type: this.type, // 1 未答  2： 已答  3：批阅
          studentId: this.type == 3 ? this.studentId : ''
        }
      }).then(res => {
        this.loading.close()
        console.log('data',res.data)
        this.list = res.data.newLists
        this.userName = res.data.userName
        this.result = res.data.situation
        this.title = res.data.title
        this.examDateStatus = res.data.examDateStatus
        this.limitTime = res.data.limitTime
        this.leftTime = res.data.surplusTime * 60
        this.courseTile = res.data.courseTile
        this.itemCount = res.data.itemCount
        this.examDeadlineStart = res.data.examDeadlineStart
        this.examDeadlineEnd = res.data.examDeadlineEnd
        this.sumScore = res.data.sumScore
        this.resultId = res.data.resultId
        this.comment = res.data.comment
        this.markingStatus = res.data.markingStatus
        // alert(res.data.surplusTime)
        if(this.type == 1) {
          this.handleSubmit(res.data.examTiming)
          this.initTime()
        }
        console.log('result',this.result)
        
        if(this.type == 1){
          // for(let a=0;a<this.list.length;a++){
          //   if(this.list[a].typeId == 2){
          //       this.form[a] = []
          //   }
          //   if(this.list[a].typeId == 5) {
          //       this.form[a] = []
          //       this.show[a] = [true]
          //       console.log('11',this.list[a].answerLength)
          //       this.item5[a] = ''
          //       for(let i = 0; i<this.list[a].answerLength;i++){
          //       this.item5[a] += '1'
          //       }
          //   }
          //   if(this.list[a].typeId == 6) {
          //       this.show[a] = [true]
          //   }
          //   if(this.list[a].typeId == 7){
          //     this.form[a] = []
          //     this.show[a] = []
          //     for(let b=0;b<this.list[a].childrenList.length;b++){
          //       if(this.list[a].childrenList[b].typeId == 2){
          //         this.form[a][b] = []
          //       }
          //       if(this.list[a].childrenList[b].typeId == 5){
          //         this.form[a][b] = []
          //         this.show[a][b] = [true]
          //         this.item5[a][b] = ''
          //         for(let i = 0; i<this.list[a].childrenList[b].answerLength;i++){
          //           this.item5[a][b] += '1'
          //         }
          //       }
          //       if(this.list[a].childrenList[b].typeId == 6){
          //         this.show[a][b] = [true]
          //         console.log('jd',this.show[a][b])
          //       }
          //     }
          //   }
          // }
          for(let i = 0; i < res.data.newLists.length; i++) {
            let typeId = res.data.newLists[i].typeId
            switch (typeId) {
              case 1:
                this.questionList1.push(res.data.newLists[i])
                this.form[i] = ''
                break;
              case 2:
                this.questionList2.push(res.data.newLists[i])
                this.form[i] = []
                break;
              case 3:
                this.questionList3.push(res.data.newLists[i])
                this.form[i] = []
                break;
              case 4:
                this.questionList4.push(res.data.newLists[i])
                this.form[i] = ''
                break;
              case 5:
                this.questionList5.push(res.data.newLists[i])
                this.form[i] = []
                break;
              case 6:
                this.questionList6.push(res.data.newLists[i])
                this.form[i] = ''
                break;
              case 7:
                this.questionList7.push(res.data.newLists[i])
                this.form[i] = []
                for(let idx = 0; idx < res.data.newLists[i].childrenList.length; idx++) {
                  let typeId = res.data.newLists[i].childrenList[idx].typeId
                  switch (typeId) {
                    case 1:
                      this.form[i][idx] = ''
                      break;
                    case 2:
                      this.form[i][idx] = []
                      break;
                    case 3:
                      this.form[i][idx] = []
                      break;
                    case 4:
                      this.form[i][idx] = ''
                      break;
                    case 5:
                      this.form[i][idx] = []
                      break;
                    case 6:
                      this.form[i][idx] = ''
                      break;
                    default:
                      break;
                  }
                }
                break;
              default:
                break;
            }
          }
        }
        if(this.type == 2){
          for(let i=0; i<res.data.situation.newLists.length;i++){
            if(res.data.situation.newLists[i].typeId == 1){
              this.form1.item1 = res.data.situation.newLists[i]
            }else if(res.data.situation.newLists[i].typeId == 2){
              this.form1.item2 = res.data.situation.newLists[i]
            }else if(res.data.situation.newLists[i].typeId == 4){
              this.form1.item4 = res.data.situation.newLists[i]
            }else if(res.data.situation.newLists[i].typeId == 5){
              this.form1.item5 = res.data.situation.newLists[i]
            }else if(res.data.situation.newLists[i].typeId == 6){
              this.form1.item6 = res.data.situation.newLists[i]
            }else if(res.data.situation.newLists[i].typeId == 7){
              this.form1.item7 = res.data.situation.newLists[i]
            }
          }
          for(let i=0;i<this.list.length;i++){
            if(this.list[i].typeId == 2){
              if(this.list[i].userAnswer != ''){
                this.dxform[i] = []
                this.dxform[i] = this.list[i].userAnswer.split('')
                console.log('dx',dxform[i])
              }
            }
            if(this.list[i].typeId == 5){
              if(this.list[i].userAnswer != ''){
                this.dxform[i] = []
                this.dxform[i] = this.list[i].userAnswer.split('$')
                this.dxform[i] = this.dxform[i].join(',')
              }
              this.tkform[i] = this.list[i].answer.join(",")
            }
          }
        }
      })
    },
    getSubmissionComment(comments){
      console.log('1111')
      this.$axios.post('/yxs/api/web/question/submissionComment', {
        comment: comments,//评语内容
        paperId: this.paperId,//试卷id
        userId: this.studentId,
        userToken: this.userInfo.userToken,
        resultId: this.resultId
      }).then(res => {

         this.$router.push({
          name: 'teacher-manage',
          query: {
            paperId: this.paperId,
            name: this.title
          }
        })
      })
    },
    getSubmission(id, comments,scores){
      let lists = {
        questionId: id,
        comment: comments,
        score: scores
      }
      console.log('submit',lists)
      this.$axios.post('/yxs/api/web/question/submission', {
        paperId: this.paperId,//试卷id
        userId: this.studentId,
        userToken: this.userInfo.userToken,
        lists
      }).then(res => {
        console.log('11',res)
        this.getTeacherlist();
      })
    },
    getTeacherlist(){
      this.loading = this.$loading({
        lock: true,
        text: '正在加载中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      this.$axios('/yxs/api/web/question/startAnswer', {
        params: {
          examPaperId: this.paperId,
          userToken: this.userInfo.userToken,
          resultId: this.type == 1 ? '' : this.resultId,
          type: this.type,
          studentId: this.type == 3 ? this.studentId : ''
        }
      }).then(res => {
        this.loading.close()
        console.log('teacher',res.data)
        this.list = res.data.newLists
        this.userName = res.data.userName
        this.result = res.data.situation
        this.title = res.data.title
        this.examDateStatus = res.data.examDateStatus
        this.limitTime = res.data.limitTime
        this.courseTile = res.data.courseTile
        this.itemCount = res.data.itemCount
        this.examDeadlineStart = res.data.examDeadlineStart
        this.examDeadlineEnd = res.data.examDeadlineEnd
        this.sumScore = res.data.sumScore
        this.markingStatus = res.data.markingStatus
        for(let i=0; i<res.data.situation.newLists.length;i++){
          if(res.data.situation.newLists[i].typeId == 1){
            this.form1.item1 = res.data.situation.newLists[i]
          }else if(res.data.situation.newLists[i].typeId == 2){
            this.form1.item2 = res.data.situation.newLists[i]
          }else if(res.data.situation.newLists[i].typeId == 4){
            this.form1.item4 = res.data.situation.newLists[i]
          }else if(res.data.situation.newLists[i].typeId == 5){
            this.form1.item5 = res.data.situation.newLists[i]
          }else if(res.data.situation.newLists[i].typeId == 6){
            this.form1.item6 = res.data.situation.newLists[i]
          }else if(res.data.situation.newLists[i].typeId == 7){
            this.form1.item7 = res.data.situation.newLists[i]
          }
        }
        for(let i=0;i<this.list.length;i++){
          if(this.list[i].typeId == 2){
            if(this.list[i].userAnswer != null){
              this.dxform[i] = []
              this.dxform[i] = this.list[i].userAnswer.split('')
            }
          }
          if(this.list[i].typeId == 5){
            if(this.list[i].userAnswer != null){
              this.dxform[i] = []
              this.dxform[i] = this.list[i].userAnswer.split('$')
              this.dxform[i] = this.dxform[i].join(',')
            }
            this.tkform[i] = this.list[i].answer.join(",")
          }
          if(this.list[i].typeId == 6){
            this.show[i] = true
            // 已批阅
            if(this.list[i].status != 4 && this.list[i].status != 1){
              showTeacher = true
            } 
          }
        }
      })
    },
    teacherSumit(){
      let lists=[]
      this.$prompt(`学员${ this.userName }，主观题得分${ this.result.subjectScore }分，总得分${ this.sumScore}分给学员打个评语鼓励下吧`, '温馨提示', {
        confirmButtonText: '提交批阅评语 ',
        cancelButtonText: '再批阅一遍',
      }).then(({ value }) => {
        this.getSubmissionComment(value)
      }).catch(() => {   
      });
    },
    changeType(val) {
      this.type = val
    },
    toggle(e) {
      let nextEl = e.currentTarget.nextElementSibling
      if(nextEl.style.display == 'block') {
        nextEl.style.display = 'none'
      } else {
        nextEl.style.display = 'block'
      }
    },
    // 交卷
    submit(status=1) {
      if(status != 1) {
        this.submitSimulatedVolume(0)
      } else {
        let lists = this.getResultList()
        this.$confirm(`亲爱的学员，您本次答题耗时${ Math.ceil((this.limitTime * 60 - this.leftTime) / 60) }分钟，漏答${ this.leftSum }题`, '温馨提示', {
          confirmButtonText: '我要交卷',
          cancelButtonText: '再检查一遍',
          type: 'warning'
        }).then(() => {
          this.submitSimulatedVolume(1)
        }).catch(() => {

        });
      }
    },
    getResultList() {
      let lists = []
      let sum = 0
      this.list.forEach((ele, i) => {
        if(!this.form[i] || this.form[i].length == 0) {
          sum += 1
          // this.form[i] = ''
        }
        lists[i] = { "questionId": ele.questionId, "answer": this.form[i] }
        if(this.list[i].typeId == 2){
          let choose = ''
          this.form[i].sort()
          choose= this.form[i].join('')
          lists[i] = { "questionId": ele.questionId, "answer": choose }
        }
        if(this.list[i].typeId == 5){
          let choose = ''
          choose =this.form[i].join('$')
          lists[i] = { "questionId": ele.questionId, "answer": choose }
        }
        if(this.list[i].typeId == 7){
          let length = 0
          for(let c= 0;c<i;c++){
            if(this.list[c].typeId == 7){
              length += this.list[c].childrenList.length 
            }
          }
          lists[i+length]=[]
          this.list[i].childrenList.forEach((ele1, a) => {
            if(!this.form[i][a]) {
              this.form[i][a] = ''
            }
            lists[i+a+length] = { "questionId": ele1.questionId, "answer": this.form[i][a] }
            console.log("wwwww",lists[i+a+length])
            if(this.list[i].childrenList[a].typeId == 2){
              let choose =''
              this.form[i][a].sort()
              choose= this.form[i][a].join('')
              lists[i+a+length] = { "questionId": ele1.questionId, "answer": choose }
            }
            if(this.list[i].childrenList[a].typeId == 5){
              let choose = ''
              choose =this.form[i][a].join('$')
              lists[i+a+length] = { "questionId": ele1.questionId, "answer": choose }
            }
          })
        }
      })
      this.leftSum = sum
      return lists
    },
    submitSimulatedVolume(status) {
      console.log('form',this.form)
      let lists = this.getResultList()
      this.$axios.post('/yxs/api/web/user/submitSimulatedVolume', {
        userToken: this.userInfo.userToken,
        paperId: this.paperId,
        answerTime: this.limitTime * 60 - this.leftTime,
        resultId: this.resultId,
        lists,
        submitStatus: status
      }).then(res => {
        if(status == 1) {
          clearInterval(this.timer)
          clearInterval(this.timer2)
          this.form = []
          this.item5 = ''
          this.isResult = true
          this.$message({
            type: 'success',
            message: '提交成功!'
          });
          this.$router.push({
            name: 'mylearn-examination',
          })
        }
      })
    },
    duringDate(){
      if(this.examDateStatus == 0){
        return `答题期限：不限`
      }else if( this.examDateStatus == 1){
        let start = this.examDeadlineStart
        let end = this.examDeadlineEnd
        return`答题期限${start}至${end}，`
      }
    },
    collection(id){
      this.$axios.post('/yxs/api/web/question/saveCollectionQuestion', {
          userToken: this.userInfo.userToken,
          paperId: this.paperId,
          questionId: id
        }).then(res => {
         this.$message({
            type: 'success',
            message: '已收藏!'
          });
          this.getList();
      }).catch(() => {
      });
    },
    cancelCollection(id){
      this.$axios('/yxs/api/web/question/cancelCollectionQuestion', {
        params:{
          userToken: this.userInfo.userToken,
          paperId: this.paperId,
          questionId: id
        }
        }).then(res => {
         this.$message({
            type: 'success',
            message: '已取消收藏!'
          });
          this.getList();
      }).catch(() => {
      });
    },
    dateFormatter(time) {
      let date = new Date(time)
      let y = date.getFullYear()
      let m = date.getMonth() + 1
      let d = date.getDate()
      return ` ${y}-${m}-${d} `
    },
    formatStr(time) {
      return time > 9 ? time : '0'+time
    },
    showDetails(num){
      console.log(num)
      var el=document.getElementsByClassName(`question${num}`)[0];
      console.log(el.offsetTop);
      if(this.showIndex==num){
        this.showIndex=null;
      }else{
        this.showIndex=num;
      }
      this.$nextTick(function () {
        window.scrollTo({"behavior":"smooth","top":el.offsetTop});
      })
    }
  }
};
</script>
<style lang="scss" scoped>
  .title {
    width: 1200px;
    margin: 20px auto;
    color: #838383;
    font-size: 14px;
  }
  .container {
    width: 100%;
    min-height: 500px;
    padding-top: 30px;
    background: #f5f5f5;
    .score{
      background: #fff;
      width: 1200px;
      margin: 0 auto;
      padding-bottom: 10px;
      h2 {
        text-align: center;
        padding-top: 35px;
        font-size: 26px;
        color: #333;
        span{
          color: #3f8a38;
        }
      }
      .desc {
        margin: 10px 40px;
        padding: 10px 25px;
        background: #f5f5f5;
        font-size: 14px;
        color: #838383;
        line-height: 26px;
      }
      .table {
        margin: 40px 40px 10px 40px;
        table {
          border-color: #c3c3c3;
          width: 100%;
          th {
            background: #f5f5f5;
          }
          td, th {
            border-color: 1px solid #c3c3c3;
            height: 38px;
            line-height: 38px;
            text-align: center;
          }
        }
      }
    }
    .content {
      display: flex;
      width: 1160px;
      margin: 20px auto;
    }
    .content-left {
      width: 860px;
      background: #fff;
      margin-right: 20px;
      h2 {
        text-align: center;
        padding-top: 35px;
        font-size: 26px;
        color: #333;
        span{
          color: #3f8a38;
        }
      }
      .desc {
        margin: 10px 40px;
        padding: 10px 25px;
        background: #f5f5f5;
        font-size: 14px;
        color: #838383;
        line-height: 26px;
      }
      .top {
        padding-top: 30px;
        background: #fff;
        ul {
          margin: 40px;
          padding-top: 20px;
          li {
            display: inline-block;
            margin-left: 20px;
            height: 32px;
            padding: 0 12px;
            line-height: 32px;
            font-size: 16px;
            border-radius: 16px;
            min-width: 600px;
            cursor: pointer;
            &:first-child {
              margin-left: 0;
            }
          }
        }
      }
      .question {
        padding: 0 40px 0px 40px;
        background: #fff;
        .list {
          &-title {
            margin: 30px 0;
            font-size: 20px;
            color: #333;
            span {
              color: #838383;
              font-size: 16px;
            }
          }
          ul {
            .analysis{
              .a-title{
                display: inline-block;
                line-height: 21px;
                padding: 0 7px;
                border: 1px solid #333;
                color: #333;
              }
            }
            li {
              .analyse {
                margin: 20px;
                color: #838383;
                font-size: 14px;
                cursor: pointer;
                .jxbutton{
                  display: inline-block;
                  .iconarrow-right{
                    transform: rotate(90deg);
                  }
                }
                .right{
                  color: #3f8a38;
                }
                .false{
                  color: red;
                }
                .active{
                  color: red;
                  font-size: 12px;
                }
                i {
                  margin-left: 5px;
                  font-size: 14px;
                }
                .desc {
                  display: none;
                  width: 540px;
                  padding: 4px 15px;
                  margin-top: 10px;
                  background: #f5f5f5;
                  font-size: 14px;
                  line-height: 26px;
                }
              }
              p {
                margin: 20px 0;
                font-size: 16px;
                line-height: 26px;
                user-select: none;
                span{
                  color: #838383;
                }
              }
              .answer{
                padding: 20px 0;
                position: relative;
                .jdcontent{
                  display: inline-block;
                  font-size: 14px;
                  margin: 18px 0 0 50px;
                  position: relative;
                  .iconxiugai07{
                    color: #c3c3c3;
                    font-size: 16px;
                    cursor: pointer;
                    :hover{
                      color: #3f8a38;
                    }
                  }
                }
                span{
                  position: absolute;
                  left: 0;
                  top: 40px;
                }
                .input1{
                  width: 340px;
                  margin: 0 100px 20px 60px;
                }
                .input2{
                  width: 460px;
                  margin-left: 50px;
                }
                .save{
                  width: 500px;
                  height: 28px;
                  margin-top: 20px;
                  cursor:  pointer;
                  .saves{
                    display: block;
                    width: 70px;
                    text-align: center;
                    background: #3f8a38;
                    border-radius: 4px;
                    color: #fff;
                    font-size: 14px;
                    float: right;
                    line-height: 28px;
                  }
                }
              }
            }
          }
        }
      }
    }
    .isFix{
      top: 0;
    }
    .content-right {
      position: sticky;
      top: 0;
      right: 0;
      width: 280px;
      height: 550px;
      padding: 20px 24px;
      background: #fff;
      .header {
        width:244px;
        position: relative;
        height: 62px;
        border: 1px solid #666;
        border-radius: 6px;
        margin: 20px 20px 20px 0;
        text-align: center;
        font-size: 14px;
        color: #666;
        padding-top: 30px;
        .rest{
          position: absolute;
          top: -20px;
          left: 75px;
          background: #fff;
          padding: 10px;
          color: #666;
          font-size: 18px;
          z-index: 10;
        }
        span {
          color: #d81e06;
          font-weight: 700;
          font-size: 40px;
        }
      }
      .list {
        max-height: 300px;
        overflow: auto;
        li {
          display: inline-block;
          margin: 2px;
          line-height: 44px;
          background: #fff;
          border: 1px solid #d1d1d1;
          font-size: 22px;
          text-align: center;
          cursor: pointer;
          &:nth-child(5n+1) {
            margin-left: 0;
          }
          &.active {
            background: #3f8a38;
            color: #fff;
          }
          &.wrong {
            background: #ff7e7e;
            color: #fff;
          }
          &.none {
            background: #e2e2e2;
            color: #fff;
          }
          a{
            display:inline-block;
            width: 44px;
            height: 44px;
            text-decoration: none;
            color: #000;
          }
        }
      }
      .status {
        margin-top: 30px;
        span {
          position: relative;
        }
        .none {
          margin-left: 20px;
          &:before {
            content: '';
            position: absolute;
            left: -20px;
            width: 10px;
            height: 10px;
            border: 1px solid #d1d1d1;
          }
        }
        .complete {
          margin-left: 60px;
          &:before {
            content: '';
            position: absolute;
            left: -20px;
            width: 10px;
            height: 10px;
            border: 1px solid #d1d1d1;
            background: #68b361;
          }
        }
        .wrong {
          margin-left: 60px;
          &:before {
            content: '';
            position: absolute;
            left: -20px;
            width: 10px;
            height: 10px;
            border: 1px solid #d1d1d1;
            background: #ff7e7e;
          }
        }
        .wait {
          margin-left: 20px;
          &:before {
            content: '';
            position: absolute;
            left: -20px;
            width: 10px;
            height: 10px;
            border: 1px solid #d1d1d1;
            background: #e2e2e2;
          }
        }
        .collect {
          margin-left: 25px;
          .iconaixin{
            color: red;
            font-size: 14px;
          }
        }
      }
      .button {
        width: 230px;
        height: 40px;
        margin-top: 30px;
        line-height: 40px;
        color: #fff;
        background: #3f8a38;
        border-radius: 4px;
        text-align: center;
        cursor: pointer;
      }
    }
  }
  .remind{
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .6);
    z-index: 98;
    .tip{
      position: fixed;
      top: 35%;
      left: 38%;
      z-index:99;
      background: #fff;
      width: 463px;
      height: 270px;
      border-radius: 6px;
      .title{
        width: 463px;
        padding-top: 22px;
        text-align: center;
        font-size: 20px;
        color: #282828;
        line-height: 70px;
      }
      .content{
        margin: 0 auto;
        width: 367px;
        font-size:14px;
        line-height: 26px;
        color: #282828;
        span{
          color: #46C37B;
        }
      }
      .botton{
        margin: 42px 0 0 62px;
        span{
          display: inline-block;
          height:40px;
          width: 150px;
          line-height: 40px;
          text-align: center;
          border-radius: 4px;
          font-size: 16px;
          border:1px solid #3f8a38;
          color: #3f8a38;
          cursor: pointer;
        }
        .begin{
          background: #3f8a38;
          color: #fff;
          margin-left: 25px;
        }
      }
    }
  }
</style>

<style>
  .top .el-form {
    width: 790px;
    margin: 40px auto 10px;
  }
  .top .el-input {
    width: 300px;
  }
</style>
