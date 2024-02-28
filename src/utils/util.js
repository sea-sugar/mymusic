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

// 格式化时间戳 ymd-hms
export const formatDate = (timestamp) =>{
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// 格式化时间戳 ymd
export const formatDateymd = (timestamp) =>{
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}