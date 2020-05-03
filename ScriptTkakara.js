enchant();

window.onload = function () {
	const game = new Game(400, 500);  				//画面サイズを400*500にする。（このサイズだとスマホでも快適なのでおススメ）

	/////////////////////////////////////////////////
	//ゲーム開始前に必要な画像・音を読み込む部分


	//クリック音読み込み
    //https://taira-komori.jpn.org/game01.html
	const clickSndUrl = "click.mp3";			//game.htmlからの相対パス
	game.preload([clickSndUrl]); 				//データを読み込んでおく

	//間違い
	const matigaisunUrl = "blip01.mp3";
	game.preload([matigaisunUrl]); 				//データを読み込んでおく

	//一回で正解
	const ikaideseikaiUrl = "ikkaime.wav";
	game.preload([ikaideseikaiUrl]); 				//データを読み込んでおく

	//木画像
	const TreeImgUrl = "tree_green.png";						//game.htmlからの相対パス
	game.preload([TreeImgUrl]);					//データを読み込んでおく

	//みかんねこ画像
	const mikannekoImgUrl = "mikannneko.png";						//game.htmlからの相対パス
	game.preload([mikannekoImgUrl]);					//データを読み込んでおく


	//リトライボタン
	const retryImgUrl = "retry.png";						//game.htmlからの相対パス
	game.preload([retryImgUrl]);					//データを読み込んでおく


	//読み込み終わり
	/////////////////////////////////////////////////


	game.onload = function () {					//ロードが終わった後にこの関数が呼び出されるので、この関数内にゲームのプログラムを書こう

		/////////////////////////////////////////////////
		//グローバル変数 

		let point = 0;								//ポイント
		let state = 0;								//現在のゲーム状態
		let takaranoiti = Math.floor(Math.random () * 4) + 1;
		let clikeCnt = 0;

		//グローバル変数終わり
		/////////////////////////////////////////////////



		const mainScene = new Scene();					//シーン作成
		game.pushScene(mainScene);  					//mainSceneシーンオブジェクトを画面に設置
		mainScene.backgroundColor = "white"; 			//mainSceneシーンの背景は黒くした

		//ポイント表示テキスト
		const scoreText = new Label(); 					//テキストはLabelクラス
		scoreText.font = "20px Meiryo";				//フォントはメイリオ 20px 変えたかったらググってくれ
		scoreText.color = 'rgba(0,0,0,1)';		//色　RGB+透明度　
		scoreText.width = 400;							//横幅指定　今回画面サイズ400pxなので、width:400pxだと折り返して二行目表示してくれる
		scoreText.moveTo(0, 30);						//移動位置指定
		mainScene.addChild(scoreText);					//mainSceneシーンにこの画像を埋め込む
	

		scoreText.text = "現在見つけた数：" + point;					//テキストに文字表示 Pointは変数なので、ここの数字が増える

		//ポイント表示テキスト
		const clickText = new Label(); 
		clickText.font = "20px Meiryo";
		clickText.color = 'rgba(0,0,0,1)';
		clickText.width = 400;							//横幅指定　今回画面サイズ400pxなので、width:400pxだと折り返して二行目表示してくれる
		clickText.moveTo(0, 0);						//移動位置指定
		mainScene.addChild(clickText);					//mainSceneシーンにこの画像を埋め込む
	

		clickText.text = "探した数：" + clikeCnt;					

		//★イメージ１
		const TreeImg = new Sprite(539,735);				//画像サイズをここに書く。使う予定の画像サイズはプロパティで見ておくこと
		//TreeImg.moveTo(118, 100);						//位置
		TreeImg.moveTo(-180, -200);	
		//TreeImg.moveTo(0,0);
		TreeImg.image = game.assets[TreeImgUrl];			//読み込む画像の相対パスを指定。　事前にgame.preloadしてないと呼び出せない
		TreeImg.scale(0.3,0.3)
		mainScene.addChild(TreeImg);					//mainSceneにこのぞう山画像を貼り付ける  

		//★イメージ２
		const TreeImg2 = new Sprite(539,735);
		TreeImg2.moveTo(0, -200);	
		TreeImg2.image = game.assets[TreeImgUrl];	
		TreeImg2.scale(0.3,0.3)
		mainScene.addChild(TreeImg2);  

		//★イメージ３
		const TreeImg3 = new Sprite(539,735);
		TreeImg3.moveTo(-180,20);	
		TreeImg3.image = game.assets[TreeImgUrl];	
		TreeImg3.scale(0.3,0.3)
		mainScene.addChild(TreeImg3);  

		//★イメージ４
		const TreeImg4 = new Sprite(539,735);
		TreeImg4.moveTo(0,20);	
		TreeImg4.image = game.assets[TreeImgUrl];	
		TreeImg4.scale(0.3,0.3)
		mainScene.addChild(TreeImg4);  

		//★みかん猫
		const mikanneko = new Sprite(595,596);
		mikanneko.moveTo(-100, 0);	
		mikanneko.image = game.assets[mikannekoImgUrl];	
		mikanneko.scale(0.3,0.3)
		mainScene.addChild(mikanneko);  
		mikanneko.visible = false;
		

		TreeImg.ontouchend = function () {				//ボタンをタッチした（タッチして離した）時にこの中の内容を実行する
			hantei(1);
		};

		TreeImg2.ontouchend = function () {
			hantei(2);
		};

		TreeImg3.ontouchend = function () {
			hantei(3);
		};

		TreeImg4.ontouchend = function () {
			hantei(4);
		};

		mikanneko.ontouchend = function () {
			mikanneko.visible = false;
			//hantei(4);
		};
		

		function hantei(imageNo) {
			
			console.log(imageNo)
			console.log(takaranoiti)
			if (mikanneko.visible) {
				//表示中は何もしない
				return;
			}
			if (takaranoiti == imageNo) {
				
				point++;//Pointを1増やす

				if (clikeCnt == 0) {
					game.assets[ikaideseikaiUrl].clone().play();//クリックの音を鳴らす。
					point++;
				} else {
					game.assets[clickSndUrl].clone().play();//クリックの音を鳴らす。
				}


				mikanneko.visible = true;
				takaranoiti = Math.floor(Math.random () * 4) + 1;

			} else {
				game.assets[matigaisunUrl].clone().play();//クリックの音を鳴らす。
			}
			clikeCnt++;

		}



		///////////////////////////////////////////////////
		//メインループ　ここに主要な処理をまとめて書こう
		game.onenterframe = function () {
			if (state == 0) {
				clikeCnt = 0;
				point = 0;
				state = 1; 
				takaranoiti = Math.floor(Math.random () * 4) + 1;
			} else {
				if (mikanneko.visible) {
					//表示中は何もしない
					return;
				}
				//現在のテキスト表示
				scoreText.text = "現在見つけた数：" + point; 				//point変数が変化するので、毎フレームごとにpointの値を読み込んだ文章を表示する
				clickText.text = "探した数：" + clikeCnt;	
				if (clikeCnt == 10 && point != 5)  {
					game.popScene();					//mainSceneシーンを外す
					game.pushScene(endScene);				//endSceneシーンを読み込ませる
					//ゲームオーバー後のテキスト表示
					gameOverText.text = "残念！！";				//テキストに文字表示 

				} else 	if (point == 5) {
					game.popScene();					//mainSceneシーンを外す
					game.pushScene(endScene);				//endSceneシーンを読み込ませる
					//ゲームオーバー後のテキスト表示
					gameOverText.text = "５回捕まえたよ。おしまい";				//テキストに文字表示 

				}

			}




		};



		////////////////////////////////////////////////////////////////
		//結果画面
		const endScene = new Scene();
		endScene.backgroundColor = "blue";

		//GAMEOVER
		const gameOverText = new Label(); 					
		gameOverText.font = "20px Meiryo";				
		gameOverText.color = 'rgba(255,255,255,1)';		//色　RGB+透明度
		gameOverText.width = 400;							//横幅指定
		gameOverText.moveTo(0, 30);						//移動位置指定
		endScene.addChild(gameOverText);						//endSceneシーンにこの画像を埋め込む



		//リトライボタン
		const retryBtn = new Sprite(120, 60);				
		retryBtn.moveTo(50, 300);						
		retryBtn.image = game.assets[retryImgUrl];	
		endScene.addChild(retryBtn);				

		retryBtn.ontouchend = function () {				//S_Retryボタンをタッチした（タッチして離した）時にこの中の内容を実行する
			state = 0;
			game.popScene();						//endSceneシーンを外す
			game.pushScene(mainScene);					//mainSceneシーンを入れる
		};



	};
	game.start();
};