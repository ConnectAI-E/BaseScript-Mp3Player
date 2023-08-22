import $ from 'jquery';
import { bitable } from '@base-open/web-api';
// import './index.scss';

declare global {
  interface Window {
    playlist: [];
  }
}

$(async function() {

  const off = bitable.base.onSelectionChange(async (event) => {
    // console.log(event);

    if (!event.data.fieldId) {
      return;
    } else {
      let selected_tableId: any = event.data.tableId;
      let selected_recordId: any = event!.data!.recordId;
      let selected_fieldId: any = event!.data!.fieldId;

      const table = await bitable.base.getTableById(selected_tableId);
      const valueList: any = await table.getCellValue(selected_fieldId, selected_recordId);
      // console.log(1, valueList);


      // console.log(window.playlist);

      let play_list: any = <HTMLElement>document.querySelector("#list");
      play_list.innerHTML = "";
      window.playlist = [];

      for (const value_item of valueList) {
        // console.log(value_item.name);
        let type = value_item.type;
        let main_type = type.split("/")[0];

        if (main_type === 'audio' || main_type === 'video') {
          const url = await table.getAttachmentUrl(value_item.token, selected_fieldId, selected_recordId)
          let sourceUrl: any = <HTMLElement>document.querySelector("#sourceUrl");
          sourceUrl.value = url + "##" + value_item.name;
          // console.log(url + "##" + value_item.name);

          let addList: any = <HTMLElement>document.querySelector("#addList");
          addList.click();
          // } else {
          //   const url = await table.getAttachmentUrl(value_item.token, selected_fieldId, selected_recordId)
          // console.log(url + "##" + value_item.name);
        }
      }

      let do_next: any = <HTMLElement>document.querySelector("#do_next");
      do_next.click();
    }
  })


});