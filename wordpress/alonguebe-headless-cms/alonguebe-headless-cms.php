<?php
/**
 * Plugin Name: Alonguebe Headless CMS
 * Description: Painel e API de conteúdo para o site React da Alonguebe.
 * Version: 1.0.0
 * Author: Alonguebe
 */

// Impede que alguém execute este arquivo diretamente, fora do WordPress.
if (!defined('ABSPATH')) exit;

// Nome da opção que guarda todos os campos gerais em um único registro.
const ALONGUEBE_OPTION = 'alonguebe_site_settings';
const ALONGUEBE_RATE_LIMIT = 5;
const ALONGUEBE_RATE_WINDOW = 10 * MINUTE_IN_SECONDS;
const ALONGUEBE_DUPLICATE_WINDOW = 15 * MINUTE_IN_SECONDS;

/** Campos de texto globais e títulos das seções. */
function alonguebe_setting_fields() {
    return array(
        'brand_name' => array('Marca', 'Alonguebe'),
        'phone' => array('Telefone formatado', '+55 (51) 99999-9999'),
        'whatsapp' => array('WhatsApp (somente números)', '5551999999999'),
        'email' => array('E-mail', 'contato@alonguebe.com.br'),
        'instagram' => array('Instagram (sem @)', 'alonguebe'),
        'address' => array('Endereço', 'Rua XV de Novembro, 123 - Centro, Canoas - RS'),
        'opening_hours' => array('Horário de funcionamento', 'Segunda a Sábado: 09h às 19h'),
        'hero_tag' => array('Hero: chamada superior', 'Sua autoestima renovada'),
        'hero_title' => array('Hero: título', 'Alonguebe'),
        'hero_subtitle' => array('Hero: subtítulo', 'Salão de Beleza em Canoas'),
        'hero_lead' => array('Hero: texto de destaque', 'Realce sua beleza com cuidado, elegância e profissionalismo no coração de Canoas.'),
        'hero_text' => array('Hero: texto', 'Na Alonguebe, cada detalhe é pensado para valorizar sua autoestima, seu estilo e sua beleza natural.'),
        'hero_primary_button' => array('Hero: botão principal', 'Agendar pelo WhatsApp'),
        'hero_secondary_button' => array('Hero: botão secundário', 'Conhecer serviços'),
        'about_tag' => array('Sobre: chamada', 'Nossa Essência'),
        'about_title' => array('Sobre: título', 'Sobre a Alonguebe'),
        'about_lead' => array('Sobre: texto de destaque', 'A Alonguebe é um salão de beleza em Canoas criado para oferecer cuidado, beleza e autoestima.'),
        'about_text' => array('Sobre: texto', 'Nosso atendimento é feito com carinho, atenção aos detalhes e foco em resultados.'),
        'about_image_1' => array('Sobre: URL da imagem principal', ''),
        'about_image_2' => array('Sobre: URL da segunda imagem', ''),
        'about_image_3' => array('Sobre: URL da terceira imagem', ''),
        'services_tag' => array('Serviços: chamada', 'O que fazemos por você'),
        'services_title' => array('Serviços: título', 'Nossos Serviços'),
        'services_text' => array('Serviços: descrição', 'Oferecemos serviços completos de beleza e bem-estar.'),
        'differentials_tag' => array('Diferenciais: chamada', 'Por que nos escolher?'),
        'differentials_title' => array('Diferenciais: título', 'Nossos Diferenciais'),
        'differentials_text' => array('Diferenciais: descrição', 'Trabalhamos focados em oferecer excelência em cada atendimento.'),
        'differential_1_title' => array('Diferencial 1: título', 'Atendimento Humanizado'),
        'differential_1_text' => array('Diferencial 1: texto', 'Nossa equipe recebe você com empatia, dedicação e atenção.'),
        'differential_2_title' => array('Diferencial 2: título', 'Produtos de Qualidade'),
        'differential_2_text' => array('Diferencial 2: texto', 'Utilizamos marcas renomadas para cuidar da saúde dos seus fios.'),
        'differential_3_title' => array('Diferencial 3: título', 'Experiência de Bem-estar'),
        'differential_3_text' => array('Diferencial 3: texto', 'Um ambiente aconchegante para tornar sua visita revigorante.'),
        'differential_4_title' => array('Diferencial 4: título', 'Localização Central'),
        'differential_4_text' => array('Diferencial 4: texto', 'Fácil acesso e estacionamento nas proximidades.'),
        'gallery_tag' => array('Galeria: chamada', 'Inspiração e Resultados'),
        'gallery_title' => array('Galeria: título', 'Nossa Galeria'),
        'gallery_text' => array('Galeria: descrição', 'Conheça alguns dos nossos trabalhos.'),
        'testimonials_tag' => array('Depoimentos: chamada', 'Quem Confia em Nós'),
        'testimonials_title' => array('Depoimentos: título', 'Depoimentos'),
        'testimonials_text' => array('Depoimentos: descrição', 'Veja a opinião de quem já passou pela experiência Alonguebe.'),
        'location_tag' => array('Localização: chamada', 'Onde Estamos'),
        'location_title' => array('Localização: título', 'Salão de beleza em Canoas, perto de você'),
        'location_text' => array('Localização: descrição', 'Localização privilegiada e de fácil acesso.'),
        'faq_tag' => array('FAQ: chamada', 'Dúvidas Frequentes'),
        'faq_title' => array('FAQ: título', 'FAQ - Perguntas Frequentes'),
        'faq_text' => array('FAQ: descrição', 'Tire suas dúvidas sobre nosso atendimento.'),
        'contact_tag' => array('Contato: chamada', 'Fale Conosco'),
        'contact_title' => array('Contato: título', 'Contato'),
        'contact_text' => array('Contato: descrição', 'Tem alguma dúvida? Escolha o canal de sua preferência.'),
        'appointment_tag' => array('Agendamento: chamada', 'Reserve seu Momento'),
        'appointment_title' => array('Agendamento: título', 'Agende seu Horário'),
        'appointment_text' => array('Agendamento: descrição', 'Preencha seus dados e solicite seu horário.'),
        'form_name_label' => array('Formulários: label nome', 'Nome Completo'),
        'form_email_label' => array('Formulários: label e-mail', 'E-mail'),
        'form_phone_label' => array('Agendamento: label telefone', 'Telefone / WhatsApp'),
        'form_service_label' => array('Agendamento: label serviço', 'Serviço Desejado'),
        'form_date_label' => array('Agendamento: label data', 'Data Desejada'),
        'form_time_label' => array('Agendamento: label horário', 'Horário Desejado'),
        'form_notes_label' => array('Agendamento: label observações', 'Observações Adicionais'),
        'appointment_submit_label' => array('Agendamento: botão enviar', 'Solicitar Agendamento'),
        'contact_form_title' => array('Contato: título do formulário', 'Envie uma Mensagem Rápida'),
        'contact_message_label' => array('Contato: label mensagem', 'Sua Mensagem'),
        'contact_submit_label' => array('Contato: botão enviar', 'Enviar Mensagem'),
        'cta_tag' => array('CTA: chamada', 'Sua beleza merece o melhor'),
        'cta_title' => array('CTA: título', 'Pronta para renovar seu visual?'),
        'cta_text' => array('CTA: descrição', 'Agende seu horário e viva uma experiência única de beleza.'),
        'footer_text' => array('Rodapé: descrição', 'Beleza, cuidado e autoestima em cada detalhe.'),
        'footer_navigation_title' => array('Rodapé: título navegação', 'Navegação'),
        'footer_links_title' => array('Rodapé: título links', 'Links Úteis'),
        'footer_address_title' => array('Rodapé: título endereço', 'Endereço'),
    );
}

/** Registra as listas editoriais e as duas caixas de entrada de formulários. */
function alonguebe_register_content_types() {
    $types = array(
        'along_service' => array('Serviços', 'Serviço', 'dashicons-admin-tools', true),
        'along_gallery' => array('Galeria', 'Imagem', 'dashicons-format-gallery', true),
        'along_testimonial' => array('Depoimentos', 'Depoimento', 'dashicons-format-quote', false),
        'along_faq' => array('Perguntas frequentes', 'Pergunta', 'dashicons-editor-help', false),
        'along_appointment' => array('Agendamentos', 'Agendamento', 'dashicons-calendar-alt', false),
        'along_message' => array('Mensagens', 'Mensagem', 'dashicons-email-alt', false),
    );

    // Cada configuração contém plural, singular, ícone e suporte a imagem.
    foreach ($types as $type => $config) {
        register_post_type($type, array(
            'labels' => array('name' => $config[0], 'singular_name' => $config[1], 'add_new_item' => 'Adicionar ' . $config[1]),
            'public' => in_array($type, array('along_service', 'along_gallery', 'along_testimonial', 'along_faq'), true),
            'show_in_rest' => true,
            'show_ui' => true,
            'menu_icon' => $config[2],
            'supports' => array_values(array_filter(array('title', 'editor', $config[3] ? 'thumbnail' : null))),
            'has_archive' => false,
            'rewrite' => false,
        ));
    }
}
add_action('init', 'alonguebe_register_content_types');

/**
 * Declara os metadados extras dos posts.
 * O prefixo `_along_` reduz o risco de conflito com temas e outros plugins.
 */
function alonguebe_register_meta() {
    $fields = array('category', 'city', 'stars', 'order', 'phone', 'email', 'service', 'date', 'time', 'notes', 'status');
    foreach (array('along_service', 'along_gallery', 'along_testimonial', 'along_faq', 'along_appointment', 'along_message') as $type) {
        foreach ($fields as $field) {
            register_post_meta($type, '_along_' . $field, array('type' => 'string', 'single' => true, 'show_in_rest' => true, 'sanitize_callback' => 'sanitize_text_field'));
        }
    }
}
add_action('init', 'alonguebe_register_meta');

/** Adiciona ao editor as caixas de detalhes e de leitura das submissões. */
function alonguebe_add_meta_boxes() {
    foreach (array('along_service', 'along_gallery', 'along_testimonial', 'along_faq') as $type) {
        add_meta_box('alonguebe_details', 'Detalhes do item', 'alonguebe_render_meta_box', $type, 'side');
    }
    add_meta_box('alonguebe_appointment_data', 'Dados completos do agendamento', 'alonguebe_render_submission_box', 'along_appointment', 'normal', 'high');
    add_meta_box('alonguebe_message_data', 'Dados completos da mensagem', 'alonguebe_render_submission_box', 'along_message', 'normal', 'high');
}
add_action('add_meta_boxes', 'alonguebe_add_meta_boxes');

/** Renderiza os campos auxiliares usados para ordenar e classificar itens. */
function alonguebe_render_meta_box($post) {
    // O nonce prova, no salvamento, que o formulário veio deste painel.
    wp_nonce_field('alonguebe_meta', 'alonguebe_meta_nonce');
    $labels = array('category' => 'Categoria', 'city' => 'Cidade', 'stars' => 'Estrelas (1 a 5)', 'order' => 'Ordem de exibição');
    foreach ($labels as $key => $label) {
        $value = get_post_meta($post->ID, '_along_' . $key, true);
        echo '<p><label><strong>' . esc_html($label) . '</strong></label><br><input style="width:100%" name="along_' . esc_attr($key) . '" value="' . esc_attr($value) . '"></p>';
    }
}

/** Exibe todos os dados recebidos; campos somente leitura evitam alteração acidental. */
function alonguebe_render_submission_box($post) {
    $is_appointment = $post->post_type === 'along_appointment';
    $fields = $is_appointment
        ? array('email' => 'E-mail', 'phone' => 'Telefone / WhatsApp', 'service' => 'Serviço desejado', 'date' => 'Data desejada', 'time' => 'Horário desejado', 'notes' => 'Observações', 'status' => 'Status')
        : array('email' => 'E-mail', 'phone' => 'Telefone / WhatsApp', 'status' => 'Status');

    echo '<table class="widefat striped"><tbody>';
    echo '<tr><th style="width:220px">Nome</th><td>' . esc_html(preg_replace('/\s+-\s+\d{2}\/\d{2}\/\d{4}.*$/', '', get_the_title($post))) . '</td></tr>';
    foreach ($fields as $key => $label) {
        $value = get_post_meta($post->ID, '_along_' . $key, true);
        if ($key === 'date' && $value) {
            $date = DateTime::createFromFormat('Y-m-d', $value);
            if ($date) $value = $date->format('d/m/Y');
        }
        echo '<tr><th>' . esc_html($label) . '</th><td>' . ($value !== '' ? nl2br(esc_html($value)) : '<em>Não informado</em>') . '</td></tr>';
    }
    if (!$is_appointment) echo '<tr><th>Mensagem</th><td>' . nl2br(esc_html($post->post_content)) . '</td></tr>';
    echo '</tbody></table>';
}

/** Colunas resumidas na listagem de agendamentos. */
function alonguebe_appointment_columns($columns) {
    return array(
        'cb' => $columns['cb'],
        'title' => 'Cliente',
        'along_email' => 'E-mail',
        'along_phone' => 'Telefone',
        'along_service' => 'Serviço',
        'along_schedule' => 'Data e horário',
        'along_status' => 'Status',
        'date' => 'Recebido em',
    );
}
add_filter('manage_along_appointment_posts_columns', 'alonguebe_appointment_columns');

/** Preenche as colunas personalizadas com metadados do registro atual. */
function alonguebe_submission_column_value($column, $post_id) {
    $meta = fn($key) => get_post_meta($post_id, '_along_' . $key, true);
    if ($column === 'along_email') echo esc_html($meta('email') ?: '—');
    if ($column === 'along_phone') echo esc_html($meta('phone') ?: '—');
    if ($column === 'along_service') echo esc_html($meta('service') ?: '—');
    if ($column === 'along_schedule') {
        $date = $meta('date');
        $parsed = $date ? DateTime::createFromFormat('Y-m-d', $date) : false;
        echo esc_html(($parsed ? $parsed->format('d/m/Y') : ($date ?: '—')) . ($meta('time') ? ' às ' . $meta('time') : ''));
    }
    if ($column === 'along_status') echo esc_html($meta('status') ?: 'Pendente');
}
add_action('manage_along_appointment_posts_custom_column', 'alonguebe_submission_column_value', 10, 2);

/** Colunas resumidas na listagem de mensagens. */
function alonguebe_message_columns($columns) {
    return array('cb' => $columns['cb'], 'title' => 'Remetente', 'along_email' => 'E-mail', 'along_phone' => 'Telefone', 'date' => 'Recebida em');
}
add_filter('manage_along_message_posts_columns', 'alonguebe_message_columns');
add_action('manage_along_message_posts_custom_column', 'alonguebe_submission_column_value', 10, 2);

/** Salva os detalhes editoriais somente para usuários autorizados. */
function alonguebe_save_meta($post_id) {
    if (!isset($_POST['alonguebe_meta_nonce']) || !wp_verify_nonce($_POST['alonguebe_meta_nonce'], 'alonguebe_meta') || !current_user_can('edit_post', $post_id)) return;
    foreach (array('category', 'city', 'stars', 'order') as $key) {
        if (isset($_POST['along_' . $key])) update_post_meta($post_id, '_along_' . $key, sanitize_text_field(wp_unslash($_POST['along_' . $key])));
    }
}
add_action('save_post', 'alonguebe_save_meta');

/** Cria o menu de configurações gerais e registra sua opção no WordPress. */
function alonguebe_settings_menu() {
    add_menu_page('Alonguebe CMS', 'Alonguebe CMS', 'manage_options', 'alonguebe-cms', 'alonguebe_settings_page', 'dashicons-admin-customizer', 2);
    register_setting('alonguebe_settings', ALONGUEBE_OPTION, array('sanitize_callback' => 'alonguebe_sanitize_settings'));
}
add_action('admin_menu', 'alonguebe_settings_menu');
// admin_init garante que a opção também esteja registrada ao salvar o form.
add_action('admin_init', function () { register_setting('alonguebe_settings', ALONGUEBE_OPTION, array('sanitize_callback' => 'alonguebe_sanitize_settings')); });

/** Higieniza todos os campos antes de armazená-los no banco. */
function alonguebe_sanitize_settings($input) {
    $clean = array();
    foreach (alonguebe_setting_fields() as $key => $field) $clean[$key] = sanitize_textarea_field($input[$key] ?? '');
    return $clean;
}

/** Monta a tela Alonguebe CMS usando a API de configurações do WordPress. */
function alonguebe_settings_page() {
    $values = wp_parse_args(get_option(ALONGUEBE_OPTION, array()), array_map(fn($field) => $field[1], alonguebe_setting_fields()));
    echo '<div class="wrap"><h1>Conteúdo geral da Alonguebe</h1><p>Edite os campos e clique em Salvar. Listas como serviços, galeria e FAQ ficam nos menus laterais.</p><form method="post" action="options.php">';
    settings_fields('alonguebe_settings');
    echo '<table class="form-table"><tbody>';
    foreach (alonguebe_setting_fields() as $key => $field) {
        echo '<tr><th><label for="' . esc_attr($key) . '">' . esc_html($field[0]) . '</label></th><td><textarea rows="2" class="large-text" id="' . esc_attr($key) . '" name="' . esc_attr(ALONGUEBE_OPTION) . '[' . esc_attr($key) . ']">' . esc_textarea($values[$key]) . '</textarea></td></tr>';
    }
    echo '</tbody></table>'; submit_button(); echo '</form></div>';
}

/** Converte um post editorial no formato JSON esperado pelo React. */
function alonguebe_item_data($post) {
    return array(
        'id' => $post->ID,
        'title' => get_the_title($post),
        'content' => apply_filters('the_content', $post->post_content),
        'excerpt' => wp_strip_all_tags(get_the_excerpt($post)),
        'image' => get_the_post_thumbnail_url($post, 'full') ?: '',
        'category' => get_post_meta($post->ID, '_along_category', true),
        'city' => get_post_meta($post->ID, '_along_city', true),
        'stars' => (int) (get_post_meta($post->ID, '_along_stars', true) ?: 5),
        'order' => (int) get_post_meta($post->ID, '_along_order', true),
    );
}

/** Busca todos os itens publicados de um tipo na ordem definida no painel. */
function alonguebe_get_items($type) {
    $posts = get_posts(array('post_type' => $type, 'numberposts' => -1, 'post_status' => 'publish', 'meta_key' => '_along_order', 'orderby' => 'meta_value_num date', 'order' => 'ASC'));
    return array_map('alonguebe_item_data', $posts);
}

/** Resposta agregada: configurações e listas necessárias para montar o site. */
function alonguebe_content_endpoint() {
    $defaults = array_map(fn($field) => $field[1], alonguebe_setting_fields());
    return rest_ensure_response(array(
        'settings' => wp_parse_args(get_option(ALONGUEBE_OPTION, array()), $defaults),
        'services' => alonguebe_get_items('along_service'),
        'gallery' => alonguebe_get_items('along_gallery'),
        'testimonials' => alonguebe_get_items('along_testimonial'),
        'faq' => alonguebe_get_items('along_faq'),
    ));
}

/** Retorna uma chave anônima e estável para limitar o cliente atual. */
function alonguebe_submission_client_key($type) {
    $ip = isset($_SERVER['REMOTE_ADDR']) ? sanitize_text_field(wp_unslash($_SERVER['REMOTE_ADDR'])) : 'unknown';
    return 'along_rate_' . md5($type . '|' . $ip . '|' . wp_salt('nonce'));
}

/** Limita rajadas de submissões sem armazenar o endereço IP em texto puro. */
function alonguebe_check_rate_limit($type) {
    $key = alonguebe_submission_client_key($type);
    $attempts = (int) get_transient($key);
    if ($attempts >= ALONGUEBE_RATE_LIMIT) {
        return new WP_Error('rate_limited', 'Muitas tentativas. Aguarde 10 minutos e tente novamente.', array('status' => 429));
    }
    set_transient($key, $attempts + 1, ALONGUEBE_RATE_WINDOW);
    return true;
}

/** Detecta automação básica por campo-isca e tempo mínimo de preenchimento. */
function alonguebe_check_spam_signals($data) {
    if (!empty($data['website'])) {
        return new WP_Error('spam_detected', 'Não foi possível processar o envio.', array('status' => 400));
    }

    $started_at = isset($data['form_started_at']) ? (int) $data['form_started_at'] : 0;
    $elapsed = (int) floor(microtime(true) * 1000) - $started_at;
    if (!$started_at || $elapsed < 3000 || $elapsed > HOUR_IN_SECONDS * 1000) {
        return new WP_Error('spam_detected', 'Atualize a página e tente novamente.', array('status' => 400));
    }
    return true;
}

/**
 * Valida e cria um agendamento ou mensagem recebido sem login.
 * Nome e e-mail são requisitos comuns; os demais dados dependem do formulário.
 */
function alonguebe_create_submission(WP_REST_Request $request, $type) {
    $data = $request->get_json_params();
    if (!is_array($data)) return new WP_Error('invalid_data', 'Envie os dados em formato JSON.', array('status' => 400));

    $rate_limit = alonguebe_check_rate_limit($type);
    if (is_wp_error($rate_limit)) return $rate_limit;
    $spam_check = alonguebe_check_spam_signals($data);
    if (is_wp_error($spam_check)) return $spam_check;

    $name = sanitize_text_field($data['name'] ?? '');
    $email = sanitize_email($data['email'] ?? '');
    if (!$name || !$email || !is_email($email)) return new WP_Error('invalid_data', 'Nome e e-mail válido são obrigatórios.', array('status' => 400));
    if (strlen($name) > 120 || strlen($email) > 254) return new WP_Error('invalid_data', 'Nome ou e-mail excede o tamanho permitido.', array('status' => 400));

    $field_limits = array('phone' => 40, 'service' => 160, 'date' => 10, 'time' => 5, 'notes' => 2000, 'message' => 4000);
    foreach ($field_limits as $field => $limit) {
        if (isset($data[$field]) && strlen((string) $data[$field]) > $limit) {
            return new WP_Error('invalid_data', 'Um dos campos excede o tamanho permitido.', array('status' => 400));
        }
    }

    $fingerprint_data = array($type, strtolower($email), $name, $data['phone'] ?? '', $data['date'] ?? '', $data['time'] ?? '', $data['message'] ?? $data['notes'] ?? '');
    $duplicate_key = 'along_dup_' . md5(wp_json_encode($fingerprint_data) . wp_salt('nonce'));
    if (get_transient($duplicate_key)) return new WP_Error('duplicate_submission', 'Este envio já foi recebido.', array('status' => 409));
    $requested_schedule = '';
    if ($type === 'along_appointment' && !empty($data['date'])) {
        $date = DateTime::createFromFormat('Y-m-d', sanitize_text_field($data['date']));
        $requested_schedule = ' - ' . ($date ? $date->format('d/m/Y') : sanitize_text_field($data['date']));
        if (!empty($data['time'])) $requested_schedule .= ' ' . sanitize_text_field($data['time']);
    }
    // A data no título torna a listagem administrativa fácil de identificar.
    $post_id = wp_insert_post(array(
        'post_type' => $type,
        'post_status' => 'publish',
        'post_title' => $name . ($requested_schedule ?: ' - ' . current_time('d/m/Y H:i')),
        'post_content' => sanitize_textarea_field($data['message'] ?? $data['notes'] ?? ''),
    ));
    if (is_wp_error($post_id)) return $post_id;
    foreach (array('email', 'phone', 'service', 'date', 'time', 'notes') as $field) if (isset($data[$field])) update_post_meta($post_id, '_along_' . $field, sanitize_text_field($data[$field]));
    update_post_meta($post_id, '_along_status', 'Pendente');
    set_transient($duplicate_key, 1, ALONGUEBE_DUPLICATE_WINDOW);
    return new WP_REST_Response(array('message' => 'Recebido com sucesso.', 'id' => $post_id), 201);
}

/** Registra as três rotas públicas consumidas pelo frontend. */
function alonguebe_register_routes() {
    // Visitantes não têm sessão WordPress, por isso as permissões são públicas.
    // Os callbacks aplicam honeypot, tempo mínimo, deduplicação e rate limiting.
    register_rest_route('alonguebe/v1', '/content', array('methods' => 'GET', 'callback' => 'alonguebe_content_endpoint', 'permission_callback' => '__return_true'));
    register_rest_route('alonguebe/v1', '/appointments', array('methods' => 'POST', 'callback' => fn($request) => alonguebe_create_submission($request, 'along_appointment'), 'permission_callback' => '__return_true'));
    register_rest_route('alonguebe/v1', '/messages', array('methods' => 'POST', 'callback' => fn($request) => alonguebe_create_submission($request, 'along_message'), 'permission_callback' => '__return_true'));
}
add_action('rest_api_init', 'alonguebe_register_routes');
