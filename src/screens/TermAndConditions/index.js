/* eslint-disable max-len */
import React, { memo, useMemo } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import Text from '../../commons/Text';
import { Colors } from '../../configs';

const TermAndConditions = memo(({ scrollViewStyle }) => {
  const data = useMemo(
    () => [
      {
        id: 1,
        title: 'a) Mục đích thu thập thông tin cá nhân:',
        content: `Để truy cập và sử dụng dịch vụ tại Website và APP của EOH, \n Khách hàng có thể sẽ được 
          yêu cầu đăng ký với chúng tôi thông tin cá nhân (Email, Họ tên, Số ĐT liên lạc…). 
          Mọi thông tin khai báo phải đảm bảo tính chính xác và hợp pháp. 
          EOH không chịu mọi trách nhiệm liên quan đến pháp luật của thông tin khai báo. \n
          Chúng tôi cũng có thể thu thập thông tin về số lần viếng thăm, bao gồm số trang Khách hàng xem, 
          số links (liên kết) Khách hàng click và những thông tin khác liên quan đến việc kết nối đến Web, APP. 
          Chúng tôi cũng thu thập các thông tin mà trình duyệt Web (Browser) 
          Khách hàng sử dụng mỗi khi truy cập vào Web, APP, bao gồm: địa chỉ IP, loại Browser, ngôn ngữ sử dụng, 
          thời gian và những địa chỉ mà Browser truy xuất đến.`,
      },
      {
        id: 2,
        title: 'b) Phạm vi sử dụng thông tin:',
        content: `EOH thu thập và sử dụng thông tin cá nhân Khách hàng với mục đích phù hợp và 
        hoàn toàn tuân thủ nội dung của “Chính sách bảo mật” này. \n Khi cần thiết, 
        chúng tôi có thể sử dụng những thông tin này để 
        liên hệ trực tiếp với Khách hàng dưới các hình thức như: gởi thư ngỏ, đơn đặt hàng, 
        thư cảm ơn, sms, thông tin về kỹ thuật và bảo mật…`,
      },
      {
        id: 3,
        title: 'c) Thời gian lưu trữ thông tin:',
        content: `Dữ liệu cá nhân của Thành viên sẽ được lưu trữ cho đến khi có yêu cầu hủy bỏ
         hoặc tự thành viên đăng nhập và thực hiện hủy bỏ. 
         Còn lại trong mọi trường hợp thông tin cá nhân thành viên sẽ được bảo mật trên máy chủ EOH.`,
      },
      {
        id: 4,
        title: 'd) Địa chỉ của đơn vị thu thập và quản lý thông tin:',
        content: `CÔNG TY CỔ PHẦN EOH \n Địa chỉ: 298/3 Điện Biên Phủ, Phường 17, Quận Bình Thạnh, 
        Thành phố Hồ Chí Minh. \n MST: 0316384747 \n Hotline: (028) 71 004 747 \n Email: info@eoh.io`,
      },
      {
        id: 5,
        title:
          'e) Phương tiện và công cụ để người dùng tiếp cận và chỉnh sửa dữ liệu cá nhân:',
        content: `Hiện website chưa triển khai trang quản lý thông tin cá nhân của thành viên,
        vì thế việc tiếp cận và chỉnh sửa dữ liệu cá nhân dựa vào yêu cầu của khách hàng
        bằng cách hình thức sau: \n Gửi email vào địa chỉ support@eoh.io
        nhân viên sẽ hỗ trợ chỉnh sửa thay người dùng.`,
      },
      {
        id: 6,
        title: 'f) Cam kết bảo mật thông tin cá nhân khách hàng:',
        content: `Thông tin cá nhân của thành viên trên Web, App của EOH chúng tôi, 
        được EOH cam kết bảo mật tuyệt đối theo chính sách bảo vệ thông tin cá nhân của EOH. 
        Việc thu thập và sử dụng thông tin của mỗi thành viên chỉ được thực hiện khi có sự đồng ý của khách hàng
        đó trừ những trường hợp pháp luật có quy định khác. \n
        Không sử dụng, không chuyển giao, cung cấp hay tiết lộ cho bên thứ 3 nào về thông tin cá nhân của thành viên
        khi không có sự cho phép đồng ý từ thành viên. \n
        Trong trường hợp máy chủ lưu trữ thông tin bị hacker tấn công dẫn đến mất mát dữ liệu cá nhân thành viên, 
        EOH sẽ có trách nhiệm thông báo vụ việc cho cơ quan chức năng điều tra xử lý kịp thời
        và thông báo cho thành viên được biết. \n
        Bảo mật tuyệt đối mọi thông tin giao dịch trực tuyến của Thành viên bao gồm thông tin hóa đơn kế toán
        chứng từ số hóa tại khu vực dữ liệu trung tâm an toàn cấp 1 của EOH. \n
        Ban quản lý EOH yêu cầu các cá nhân khi đăng ký/mua hàng là thành viên, phải cung cấp đầy đủ thông tin cá nhân
        có liên quan như: Họ và tên, email, số điện thoại …., và chịu trách nhiệm về tính pháp lý của những thông tin trên. 
        Ban quản lý EOH không chịu trách nhiệm cũng như không giải quyết mọi khiếu nại có liên quan đến quyền lợi
        của Thành viên đó nếu xét thấy tất cả thông tin cá nhân
        của thành viên đó cung cấp khi đăng ký ban đầu là không chính xác.`,
      },
    ],
    []
  );

  return (
    <ScrollView style={[scrollViewStyle, styles.container]}>
      {data.map((item) => (
        <View key={item.id}>
          <Text style={styles.title} semibold>
            {item.title}
          </Text>
          <Text>{item.content}</Text>
        </View>
      ))}
    </ScrollView>
  );
});

export default TermAndConditions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingLeft: 10,
  },
  title: {
    paddingTop: 10,
  },
});
