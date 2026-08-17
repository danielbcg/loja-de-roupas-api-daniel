package com.daniel.api_loja.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Map;
import java.util.UUID;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/uploads")
public class UploadController {

    private static final String PASTA_DESTINO = "uploads";
    private static final long TAMANHO_MAXIMO = 5L * 1024 * 1024; // 5MB

    @PostMapping("/imagem")
    public Map<String, String> enviarImagem(@RequestParam("arquivo") MultipartFile arquivo) throws IOException {
        if (arquivo.isEmpty()) {
            throw new RuntimeException("Nenhum arquivo enviado.");
        }

        String tipo = arquivo.getContentType();
        if (tipo == null || !tipo.startsWith("image/")) {
            throw new RuntimeException("O arquivo precisa ser uma imagem.");
        }

        if (arquivo.getSize() > TAMANHO_MAXIMO) {
            throw new RuntimeException("A imagem não pode passar de 5MB.");
        }

        Path pasta = Paths.get(PASTA_DESTINO);
        if (!Files.exists(pasta)) {
            Files.createDirectories(pasta);
        }

        String extensao = "";
        String nomeOriginal = arquivo.getOriginalFilename();
        if (nomeOriginal != null && nomeOriginal.contains(".")) {
            extensao = nomeOriginal.substring(nomeOriginal.lastIndexOf("."));
        }

        String nomeArquivo = UUID.randomUUID() + extensao;
        Path destino = pasta.resolve(nomeArquivo);
        Files.copy(arquivo.getInputStream(), destino, StandardCopyOption.REPLACE_EXISTING);

        String url = "http://localhost:8080/uploads/" + nomeArquivo;
        return Map.of("url", url);
    }
}