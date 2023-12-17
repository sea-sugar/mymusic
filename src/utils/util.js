export function formatNumber(count) {
    if (count >= 10000000) {
      return (count / 10000000).toFixed(1) + '千万';
    } else if (count >= 10000) {
      return (count / 10000).toFixed(1) + '万';
    } else {
      return count.toString();
    }
}
// 格式化时间（将秒数转换为分:秒格式）
export const formatTime = (time) => {
    if(!time){
      return '00:00';
    }
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  
}
