// 评论功能子模块
<template>
	<div>
		<!--提交评论部分-->
		<div class="postCommentStyle">
			<h4>提交评论</h4>
			<div class="submitCommentStyle">
				<textarea ref="commentTextArea" rows="5" class="submitTextAreaStyle" placeholder="请输入要提交的内容"></textarea>
	
				<mt-button @click="postComment" type="primary" size="large">提交评论</mt-button>
			</div>
		</div>
	
		<!--评论列表部分-->
		<div class="commentListStyle">
			<h4>评论列表</h4>
			<div v-for="item in commentsList" class="commentItem">
				<h5>
					{{item.content}}
				</h5>
				<p class="commentUserAndTime">
					<span class="commentUser">{{item.user_name}}</span>
					<span class="commentTime">{{item.add_time | dmtDate}}</span>
				</p>
			</div>
			<mt-button @click="getMoreComments" class="loadmore" plain size="large" type="danger">加载更多</mt-button>
		</div>
	</div>
</template>

<script>
// 导入共用的common.js文件
import common from '../common/common.js'

// 导入mint-ui中的toast组件
import { Toast } from 'mint-ui';

export default {
	data() {
		return {
			pageIndex: 1,
			commentsList: []
		}
	},
	created() {
		this.getCommentsList()
	},
	methods: {
		// 提交评论功能
		postComment() {
			// 获取文本框中的值
			const comment = this.$refs.commentTextArea.value;
			// 判断文本框中的值，若为空或不合法，则提示
			if (!comment) {
				Toast({
					message: '评论内容不能为空',
					position: 'middle',
					duration: 1500
				});
				return false;
			};

			// 将评论提交到服务器
			// 拼接请求地址URL
			const url = common.apihost + 'api/postcomment/' + this.commentId;
			// 发送Ajax请求
			this.$http.post(url, {content: comment}, {emulateJSON: true}).then(response => {
				// console.log(response)
				// 根据返回的信息，判断是否提交成功
				if (response.body.status == 0) {
					// 使用Toast组件提示用户
					Toast({
						message: '提交成功',
						position: 'middle',
						duration: 1500
					});
					// 提交成功后，清空文本框内的值
					this.$refs.commentTextArea.value = '';
					// 重新加载评论列表的第一页
					this.pageIndex = 1;
					this.getCommentsList()
				} else {
					Toast({
						message: '提交失败，请重试',
						position: 'middle',
						duration: 1500
					})
				}
			}, error => {})
		},
		// 渲染评论列表
		getCommentsList() {
			// 拼接请求地址URL
			const url = common.apihost + 'api/getcomments/' + this.commentId + '?pageindex=' + this.pageIndex;
			// 发送Ajax请求
			this.$http.get(url).then(response => {
				// console.log(response);
				this.commentsList = this.pageIndex == 1 ? response.body.message : this.commentsList.concat(response.body.message);
			}, error => {})
		},
		// 加载更多功能
		getMoreComments() {
			// 将page加1
			this.pageIndex++;
			// 再调用一次渲染评论列表方法
			this.getCommentsList();
		}
	},
	// 接受父组件传递来参数
	props: ['commentId']
}
</script>

<style scoped>
h4 {
	padding: 5px 5px 10px 5px;
	border-bottom: 1px solid rgba(92, 92, 92, 0.2);
}

.submitCommentStyle,
.commentListStyle {
	padding: 5px;
}

.commentItem {
	padding: 5px;
	border-bottom: 1px solid rgba(92, 92, 92, 0.2);
	height: 70px;
	overflow-y: auto;
}

h5 {
	font-size: 16px;
	color: black;
}

.commentUserAndTime {
	margin-top: 15px;
	color: #0094ff;
}

.commentUser {
	float: left;
	width: 50%;
}

.commentTime {
	float: right;
}

.loadmore {
	margin-top: 20px;
	margin-bottom: 10px;
}
</style>
