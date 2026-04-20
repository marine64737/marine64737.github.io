async function findAll() {
    // 1. API 주소 설정 (절대 경로 또는 상대 경로)
    const uri = "https://arguably-harmonics-swab.ngrok-free.dev/word/all/shuffled"; 
    const listContainer = document.getElementById('word-list');

    try {
        const response = await fetch(uri,{
  headers: {
    'ngrok-skip-browser-warning': 'any'
  }
});
        
        if (!response.ok) {
            throw new Error('데이터를 불러오는 데 실패했습니다.');
        }

        const words = await response.json(); // 데이터가 배열 형태라고 가정

        // 기존 내용 비우기
        listContainer.innerHTML = '';

        // 2. 데이터 반복문 돌리기
        words.forEach(word => {
            const row = document.createElement('tr');
            
            // API 구조: { kanji: "...", reading: "...", meaning: "..." }
            row.innerHTML = `
                <td>${word.kanji}</td>
                <td>${word.reading}</td>
                <td>${word.meaning}</td>
            `;
            
            listContainer.appendChild(row);
        });

    } catch (error) {
        console.error("Error:", error);
        listContainer.innerHTML = '<tr><td colspan="3">불러오기 실패</td></tr>';
    }
}

async function saveWord() {
    const kanji = document.getElementById('kanji').value;
    const reading = document.getElementById('reading').value;
    const meaning = document.getElementById('meaning').value;

    if(!kanji || !reading || !meaning) {
        alert("모든 칸을 채워주세요!");
        return;
    }

    const newWord = { kanji, reading, meaning };

    try {
        const response = await fetch(`https://arguably-harmonics-swab.ngrok-free.dev/word/save`, { // API 저장 경로에 맞게 수정
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newWord)
        });

        if (response.ok) {
            alert("저장 성공!");
            // 입력칸 비우기
            document.getElementById('kanji').value = '';
            document.getElementById('reading').value = '';
            document.getElementById('meaning').value = '';
            // 목록 새로고침
            abc();
        } else {
            alert("저장 실패 (서버 오류)");
        }
    } catch (e) {
        console.error("저장 중 에러:", e);
        alert("서버와 통신할 수 없습니다.");
    }
}

// 실행
findAll();
