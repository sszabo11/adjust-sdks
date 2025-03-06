<script lang="ts">
	type Props = {
		src: string;
		title: string;
		date: Date;
		author: string;
	};

	let { src, title, date, author }: Props = $props();
</script>

<div class="article">
	<div class="img-container">
		<img {src} alt={title} />
	</div>
	<h4>{title}</h4>
	<div class="foot">
		<span>{date.toDateString()}</span>
		<span>{author}</span>
	</div>
</div>

<style>
	.article {
		padding: 18px;
		height: 230px;
		background-color: #111111;
		display: flex;
		flex-direction: column;
	}

	.img-container {
		width: 210px;
		height: 130px;
	}

	img {
		width: 100%;
		object-fit: cover;
	}

	h4 {
		font-size: 18px;
		margin: 10px 0;
		font-weight: 400;
	}

	.foot {
		display: flex;
		justify-content: space-between;
		margin-top: auto;
	}

	span {
		font-size: 14px;
		color: #676767;
		margin: 0;
	}
</style>
