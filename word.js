async function findAll() {
    // 1. API 주소 설정 (절대 경로 또는 상대 경로)
    const uri = "https://arguably-harmonics-swab.ngrok-free.dev/word/all/shuffled"; 
    const listContainer = document.getElementById('word-list');

    try {
        const response = await fetch(uri);
        
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

// 실행
abc();
